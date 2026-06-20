'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const defaultAccounts = [account1, account2, account3, account4];
const accountsStorageKey = 'bankist-accounts';

const loadAccounts = function () {
  const savedAccounts = localStorage.getItem(accountsStorageKey);
  if (!savedAccounts) return structuredClone(defaultAccounts);

  try {
    return JSON.parse(savedAccounts);
  } catch {
    localStorage.removeItem(accountsStorageKey);
    return structuredClone(defaultAccounts);
  }
};

const saveAccounts = function (accs) {
  localStorage.setItem(accountsStorageKey, JSON.stringify(accs));
};

const accounts = loadAccounts();

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let msg;
let color;
let currentUser;
let currentUserAccount;

// Create a function to record transactions on the UI
const displayMovements = function (movements, sort = false) {
  // Clean the current page
  document.querySelector('.movements').innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // Loop through the movements array and display each movement on the UI
  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${movement}€</div>
    </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Function to create usernames for each account
const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .trim()
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUsernames(accounts);

// Function to create an array of deposits from the movements of an account
const createDepositArr = function (accs) {
  accs.forEach(
    (acc) => (acc.deposits = acc.movements.filter((mov) => mov > 0))
  );
};

// Function to create an array of withdrawals from the movements of an account
const createWithdrawalArr = (accs) =>
  accs.forEach(
    (acc) => (acc.withdrawals = acc.movements.filter((mov) => mov < 0))
  );

// Function to create an array of ineterest amounts
const calcInterest = (accs) =>
  accs.forEach((acc) => {
    acc.totalInterest = acc.deposits
      .map((d) => (d * acc.interestRate) / 100)
      .filter((int) => int > 1)
      .reduce((sum, interest) => sum + interest, 0);
  });

// Function to accumulate arrays
const displaySummary = (arr) => arr.reduce((total, val) => total + val, 0);

// Function to calculate the total balance (deposits - withdrawals + interes)
const calcBalance = (accs) =>
  accs.forEach((acc) => {
    const movementBalance = acc.movements.reduce((sum, mov) => sum + mov, 0);
    acc.totalBalance = movementBalance + acc.totalInterest;
  });

// Function to Update the accounts

const updateAccs = function (accs) {
  createDepositArr(accs);
  createWithdrawalArr(accs);
  calcInterest(accs);
  calcBalance(accs);
};

// Function to update UI
const updateUI = function () {
  if (!currentUser) return;

  const totalDep = displaySummary(currentUser.deposits);
  const totalWithdrawal = displaySummary(currentUser.withdrawals);
  const totalInterest =
    Math.round(currentUser.totalInterest * 10 ** 2) / 10 ** 2;
  const currentDate = new Intl.DateTimeFormat(navigator.language).format(
    new Date()
  );

  labelSumIn.textContent = `${totalDep}€`;
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;
  labelSumInterest.textContent = `${totalInterest}€`;
  labelBalance.textContent = `${currentUser.totalBalance}€`;
  labelDate.textContent = currentDate;
  displayMovements(currentUser.movements);
};

// Function to show message
const showMessage = function (msg, color) {
  labelWelcome.textContent = msg;
  labelWelcome.style.color = color;
};

const resetUI = function () {
  currentUser = undefined;
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  labelWelcome.style.color = '';
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
};

const resetCloseUI = function () {
  currentUserAccount = undefined;
  inputCloseUsername.value = '';
  inputClosePin.value = '';
};

// Reset UI when the cursor is on username field
inputLoginUsername.addEventListener('focus', function () {
  // Reset the UI before a new login while preserving persisted account data.
  if (!currentUser) return;
  // window.location.reload();
  resetUI();
});

inputCloseUsername.addEventListener('focus', function () {
  if (!currentUserAccount) return;
  resetCloseUI();
});

// Login Functionality
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (!currentUser) {
    msg = 'User does not exist';
    color = 'red';
    showMessage(msg, color);
    return;
  }

  const loginSuccess = currentUser?.pin === Number(inputLoginPin.value);

  if (!loginSuccess) {
    msg = 'Invalid Password! Try again.';
    color = 'red';
    showMessage(msg, color);
    return;
  }

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();

  containerApp.style.opacity = 100;

  msg = 'Welcome back, ' + currentUser.owner.split(' ')[0];
  color = 'black';
  showMessage(msg, color);

  updateAccs(accounts);

  updateUI();
});

// Transfer Functionality

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  if (!currentUser) return;

  const transferAmount = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value.trim().toLowerCase();
  const receiverAcct = accounts.find((acc) => acc.username === transferTo);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if (!receiverAcct) {
    showMessage("User you're transferring to doesn't exist", 'red');
    return;
  }

  if (receiverAcct.username === currentUser.username) {
    showMessage("You can't transfer to your own account", 'red');
    return;
  }

  if (transferAmount <= 0 || transferAmount > currentUser.totalBalance) {
    showMessage("You don't have enough balance", 'red');
    return;
  }

  currentUser.movements.push(-transferAmount);
  receiverAcct.movements.push(transferAmount);

  updateAccs(accounts);
  saveAccounts(accounts);
  updateUI();

  showMessage(`Successfully transferred to ${receiverAcct.owner}!`, 'black');
});

// Close Account Functionality
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  currentUserAccount = accounts.find(
    (acc) => acc.username === inputCloseUsername.value
  );

  if (!currentUserAccount) {
    msg = 'Invalid User';
    color = 'red';
    showMessage(msg, color);
    return;
  }

  if (currentUserAccount.pin != Number(inputClosePin.value)) {
    msg = 'Invalid PIN! Please try again.';
    color = 'red';
    showMessage(msg, color);
    return;
  }

  if (currentUser !== currentUserAccount) {
    msg = "You cannot delete someone else's account";
    color = 'red';
    showMessage(msg, color);
    return;
  }

  const userDeleteIndex = accounts.findIndex(
    (acc) => acc.username === currentUserAccount.username
  );

  resetUI();
  msg = `Account of ${currentUserAccount.owner} has been closed`;

  accounts.splice(userDeleteIndex, 1);

  color = 'blue';
  showMessage(msg, color);
});

// Loan functionality
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (loanAmount <= 0) {
    msg = 'Enter Valid Load Amount';
    color = 'red';
    showMessage(msg, color);
    inputLoanAmount.value = '';
    return;
  }

  if (currentUser.movements.every((mov) => mov < 0.1 * loanAmount)) {
    msg = 'Loan Rejected';
    color = 'red';
    showMessage(msg, color);
    inputLoanAmount.value = '';
    return;
  }

  currentUser.movements.push(loanAmount);
  msg = 'Loan Approved';
  color = 'blue';
  showMessage(msg, color);

  inputLoanAmount.value = '';
  updateAccs(accounts);
  saveAccounts(accounts);
  updateUI();
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentUser.movements, !sorted);

  sorted = !sorted;
});

const clearStorageandReload = () => {
  localStorage.removeItem(accountsStorageKey);

  // Rehydrate in-memory data so the app resets without a full page reload.
  accounts.length = 0;
  accounts.push(...structuredClone(defaultAccounts));

  createUsernames(accounts);
  updateAccs(accounts);
  resetCloseUI();
  resetUI();
};

clearStorageandReload();
