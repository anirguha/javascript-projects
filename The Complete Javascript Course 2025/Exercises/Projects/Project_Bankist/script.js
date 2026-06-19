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

const accounts = [account1, account2, account3, account4];

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

const loginResetFlag = 'bankist-login-reset';
const restoreLoginField = sessionStorage.getItem(loginResetFlag) === '1';

if (restoreLoginField) {
  sessionStorage.removeItem(loginResetFlag);
  requestAnimationFrame(() => inputLoginUsername.focus());
}

inputLoginUsername.addEventListener('click', function () {
  if (sessionStorage.getItem(loginResetFlag) !== '1') return;

  sessionStorage.removeItem(loginResetFlag);
  window.location.reload();
});

// Create a function to record transactions on the UI
const displayMovements = function (movements) {
  // Clean the current page
  document.querySelector('.movements').innerHTML = '';

  // Loop through the movements array and display each movement on the UI
  movements.forEach(function (movement, i) {
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
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

// Function to create an array of deposits from the movements of an account
const createDepositArr = function (accs) {
  accs.forEach(
    (acc) => (acc.deposits = acc.movements.filter((mov) => mov > 0))
  );
};

createDepositArr(accounts);

// Function to create an array of withdrawals from the movements of an account
const createWithdrawalArr = (accs) =>
  accs.forEach(
    (acc) => (acc.withdrawals = acc.movements.filter((mov) => mov < 0))
  );

createWithdrawalArr(accounts);

createUsernames(accounts);

// Function to display the summary of withdrawals and deposits

const displaySummary = (arr) => arr.reduce((total, val) => total + val, 0);

let currentUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(inputLoginUsername.value);
  currentUser = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  const loginSuccess = currentUser?.pin === Number(inputLoginPin.value);

  if (loginSuccess) {
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    sessionStorage.setItem(loginResetFlag, '1');

    labelWelcome.textContent =
      'Welcome back, ' + currentUser.owner.split(' ')[0];

    labelWelcome.style.color = 'black';

    containerApp.style.opacity = 100;

    const totalDep = displaySummary(currentUser.deposits);
    const totalWithdrawal = displaySummary(currentUser.withdrawals);

    labelSumIn.textContent = `${totalDep}€`;
    labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;

    const interestArr = currentUser.deposits
      .map((dep) => (dep * currentUser.interestRate) / 100)
      .filter((int) => int > 1);

    const totalInterest =
      Math.round(displaySummary(interestArr) * 10 ** 2) / 10 ** 2;

    labelSumInterest.textContent = `${totalInterest}€`;

    // Function to accumulate values
    labelBalance.textContent = `${totalDep + totalWithdrawal + totalInterest}€`;

    displayMovements(currentUser.movements);
  } else {
    sessionStorage.setItem(loginResetFlag, '1');
    labelWelcome.textContent = 'Invalid User, please try again';
    labelWelcome.style.color = 'red';
  }
});
