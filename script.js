// Mock data
const account1 = {
    owner: 'Matin Taherzadeh',
    transactions: [500, -200, 1500, -700, 800, 250, -100, 1300],
    interestRate: 1.2,
    pin: 1234,
};

const account2 = {
    owner: 'Roger Federer',
    transactions: [7000, -3000, 4500, -1500, 2000, -1200, 1000, -500],
    interestRate: 1.5,
    pin: 1235,
};

const account3 = {
    owner: 'Rafael Nadal',
    transactions: [100, -500, 800, -400, 250, -50, 700, -300],
    interestRate: 0.7,
    pin: 1236,
};

const account4 = {
    owner: 'Novak Djokovic',
    transactions: [300, 900, -200, 400, 150, -100, 800, 50],
    interestRate: 1,
    pin: 1237,
};

const accounts = [account1, account2, account3, account4];

const labelIntroSentence = document.querySelector('.intro-sentence');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

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

// displaying accounts elements
const displayTransactions = function (transactions) {
    containerTransactions.innerHTML = '';

    transactions.forEach(function (tran, i) {
        const type = tran > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="transactions__row">
                <div class="transactions__type transactions__type--${type}">${i + 1} ${type}</div>
                <div class="transactions__value">${tran}</div>
            </div>
        `;
        containerTransactions.insertAdjacentHTML('afterbegin', html);
    })
}

displayTransactions(account1.transactions);

