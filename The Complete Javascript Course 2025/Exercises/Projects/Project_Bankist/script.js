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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2026-06-19T17:01:17.194Z',
    '2026-06-20T23:36:17.929Z',
    '2026-06-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2021-03-14T08:22:41.512Z',
    '2021-09-27T17:53:09.184Z',
    '2022-02-08T11:06:35.749Z',
    '2022-12-19T20:41:58.003Z',
    '2023-05-30T06:17:44.926Z',
    '2024-08-11T13:29:50.671Z',
    '2025-01-23T22:48:12.307Z',
    '2026-04-05T15:34:27.895Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2020-07-19T10:33:52.418Z',
    '2021-11-02T14:27:06.893Z',
    '2023-08-16T19:51:44.270Z',
    '2024-03-28T07:12:39.605Z',
    '2025-10-09T16:45:21.137Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const exchangeRates = {
  'USD/EUR': 1.1,
  'USD/GBP': 0.9,
  'USD/INR': 97.69,
  'EUR/USD': 1 / 1.5,
  'GBP/USD': 1 / 1.1,
  'GBP/INR': 102.37,
  'INR/GBP': 1 / 102.37,
  'INR/USD': 1 / 97.69,
  'EUR/INR': 96.39,
  'INR/EUR': 1 / 96.39,
  'EUR/GBP': 1.03,
  'GBP/EUR': 0.87,
  'USD/USD': 1,
  'GBP/GBP': 1,
  'EUR/EUR': 1,
  'INR/INR': 1,
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
const btnLogout = document.querySelector('.logout__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let msg, color, currentUser, currentUserAccount;

// Timer Function
let timerInterval;

const startLogoutTimer = function () {
  let idleLogout = 5 * 60; // 5 minutes in seconds

  const tick = function () {
    const min = String(Math.trunc(idleLogout / 60)).padStart(2, '0');
    const sec = String(idleLogout % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;

    if (idleLogout === 0) {
      clearInterval(timerInterval);
      resetUI();
    }
    idleLogout--;
  };

  tick();
  timerInterval = setInterval(tick, 1000);
  return timerInterval;
};

// Function to create an object with movement and movement dates for each account
const createMovementsAndDatesObj = (accs) => {
  accs.forEach((acc) => {
    acc.movementsObj = acc.movements.map((movement, i) => ({
      movement,
      date: acc.movementsDates[i],
    }));
  });
};

const options = {
  dateStyle: 'short',
};

// Function to format dates
const formatDates = (date, acc) =>
  new Intl.DateTimeFormat(acc.locale, options).format(date);

// Function to format numbers
const formatNumbers = (num, acc) =>
  new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(num);

console.log(formatNumbers(35678.58, account4));

// Function to find date differnces
const dateDiff = (date1, date2, acc) => {
  const dayDiff = Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return 'today';
  if (dayDiff === 1) return 'yesterday';
  if (dayDiff <= 7) return `${dayDiff} days ago`;

  return formatDates(date2, acc);
};

// Create a function to record transactions on the UI
const displayMovements = function (acc, sort = false) {
  // Clean the current page
  document.querySelector('.movements').innerHTML = '';

  const movs = sort
    ? acc.movementsObj.slice().sort((a, b) => a.movement - b.movement)
    : acc.movementsObj;

  // Loop through the movements array and display each movement on the UI
  movs.forEach(function ({ movement, date }, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const movementDate = new Date(date);
    const formattedMovement = formatNumbers(movement, acc);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
       <div class="movements__date">${dateDiff(new Date(), movementDate, acc)}</div>
      <div class="movements__value">${formattedMovement}</div>
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
  createMovementsAndDatesObj(accs);
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

  labelSumIn.textContent = `${formatNumbers(totalDep, currentUser)}`;
  labelSumOut.textContent = `${formatNumbers(Math.abs(totalWithdrawal), currentUser)}`;
  labelSumInterest.textContent = `${formatNumbers(totalInterest, currentUser)}€`;
  labelBalance.textContent = `${formatNumbers(currentUser.totalBalance, currentUser)}`;
  labelDate.textContent = currentDate;
  displayMovements(currentUser);
};

// Function to show message
const showMessage = function (msg, color) {
  labelWelcome.textContent = msg;
  labelWelcome.style.color = color;
};

// Function to reset UI
const resetUI = function () {
  currentUser = undefined;
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  labelWelcome.style.color = '';
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
};

// Function to reset UI on accoutn closure
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

  if (timerInterval) clearInterval(timerInterval);
  startLogoutTimer();

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

  clearInterval(timerInterval);
  startLogoutTimer();

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

  const er = exchangeRates[`${currentUser.currency}/${receiverAcct.currency}`];

  currentUser.movements.push(-transferAmount);
  currentUser.movementsDates.push(new Date().toISOString());
  receiverAcct.movements.push(transferAmount * er);
  receiverAcct.movementsDates.push(new Date().toISOString());

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
  currentUser.movementsDates.push(new Date().toISOString());
  msg = 'Loan Approved';
  color = 'blue';
  showMessage(msg, color);

  inputLoanAmount.value = '';
  updateAccs(accounts);
  saveAccounts(accounts);
  updateUI();
});

//Function for logout
btnLogout.addEventListener('click', function () {
  if (timerInterval) clearInterval(timerInterval);
  resetUI();
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sorted);

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
