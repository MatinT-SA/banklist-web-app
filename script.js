/***** Mock Data ********/
const account1 = {
    client: 'Matin Taherzadeh',
    pin: 1234,
    interestRate: 1.2,
    transactions: [500, -200, 1500, -700, 800, 250, -100, 1300, -130],

    transactionsDates: [
        '2024-06-04T00:00:00Z',
        '2024-06-12T03:30:45Z',
        '2024-06-20T07:15:30Z',
        '2024-06-30T10:45:15Z',
        '2024-07-01T14:00:00Z',
        '2024-07-02T16:30:30Z',
        '2024-07-03T19:45:45Z',
        '2024-07-04T21:15:15Z',
        '2024-07-05T23:59:59Z'
    ]
};

const account2 = {
    client: 'Roger Federer',
    pin: 1235,
    interestRate: 1.5,
    transactions: [7000, -3000, 4500, -1500, 2000, -1200, 1000],

    transactionsDates: [
        '2024-05-04T01:30:00Z',
        '2024-06-27T05:00:45Z',
        '2024-06-30T09:45:30Z',
        '2024-07-02T12:15:15Z',
        '2024-07-05T16:30:00Z',
        '2024-07-06T18:00:30Z',
        '2024-07-07T21:15:45Z'
    ]
};

const account3 = {
    client: 'Rafael Nadal',
    pin: 1236,
    interestRate: 0.7,
    transactions: [100, -500, 800, -400, 250, -50, 700, -300, 780, -640, 400],

    transactionsDates: [
        '2024-06-21T02:00:00Z',
        '2024-06-22T05:30:45Z',
        '2024-06-23T10:15:30Z',
        '2024-06-24T13:45:15Z',
        '2024-06-25T17:00:00Z',
        '2024-06-26T19:30:30Z',
        '2024-06-27T22:45:45Z',
        '2024-06-28T00:15:15Z',
        '2024-06-29T03:59:59Z',
        '2024-07-04T06:20:10Z',
        '2024-07-05T09:41:31Z',
    ]
};

const account4 = {
    client: 'Novak Djokovic',
    pin: 1237,
    interestRate: 1,
    transactions: [300, 900, -200, 400, 150],

    transactionsDates: [
        '2024-06-25T08:00:00Z',
        '2024-06-27T14:45:30Z',
        '2024-07-01T18:15:15Z',
        '2024-07-04T09:45:30Z',
        '2024-07-05T19:00:30Z'
    ]
};

const accounts = [account1, account2, account3, account4];

// Elements selection
const smallWidth = window.innerWidth < 700;
const labelIntroSentence = document.querySelector('.intro-sentence');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelOverviewIn = document.querySelector('.overview__value--in');
const labelOverviewOut = document.querySelector('.overview__value--out');
const labelOverviewInterest = document.querySelector('.overview__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnTerminate = document.querySelector('.form__btn--terminate');
const btnSort = document.querySelector('.btn--sort');

const loginContainer = document.querySelector('.login');
const logoutContainer = document.querySelector('.logout');
const logoutBtn = document.querySelector('.logout__btn');
const navigationLogin = document.querySelector('.navigation__login');
logoutContainer.style.display = 'none';

const inputLogins = document.querySelectorAll('.login__input');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const errorMessage = document.querySelector('.error-message');
const actionErrorMessage = document.querySelector('.action__error-message');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputTerminateUsername = document.querySelector('.form__input--user');
const inputTerminatePin = document.querySelector('.form__input--pin');

/***** Formatting dates ********/
const formatTransactionsDate = (dates) => {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const year = tranDate.getFullYear();
    const month = `${tranDate.getMonth()}`.padStart(2, 0);
    const day = `${tranDate.getDate()}`.padStart(2, 0);
    const displayDate = `${year}/${month}/${day}`;
}

/***** Reset UI ********/
const resetUI = function () {
    containerApp.style.opacity = 0;
    labelIntroSentence.textContent = 'Log into your account';
    labelTimer.textContent = '10:00';
}

/***** Login/Logout toggle ********/
function toggleLogin() {
    if (currentAccount) {
        loginContainer.style.display = 'none';
        logoutContainer.style.display = 'flex';
        navigationLogin.style.cssText = 'display: flex; justify-content: center; align-items: center; width: 31rem;';
    } else {
        loginContainer.style.display = 'flex';
        logoutContainer.style.display = 'none';
    }
}

/***** Display Data ********/
const displayData = function (acc) {
    displayTransactions(acc);
    displayBalance(acc);
    calcDisplayOverview(acc);
}

/***** Display Error message ********/
const showErrorMessage = function (message) {
    errorMessage.innerHTML = `<i class="fa-solid fa-times-circle error-icon"></i> ${message}`;
    errorMessage.classList.add('visible');

    setTimeout(() => {
        errorMessage.classList.remove('visible');
    }, 3000);
};

/***** Display Action Error message ********/
const showActionErrorMessage = function (message) {
    actionErrorMessage.innerHTML = `<i class="fa-solid fa-times-circle error-icon"></i> ${message}`;
    actionErrorMessage.classList.add('visible');

    setTimeout(() => {
        actionErrorMessage.classList.remove('visible');
    }, 3000);
};

/***** Hide Error message ********/
const hideErrorMessage = function () {
    errorMessage.classList.remove('visible');
};

/***** Hide Action Error message ********/
const hideActionErrorMessage = function () {
    actionErrorMessage.classList.remove('visible');
};

/***** Displaying Transactions ********/
const displayTransactions = function (acc, sort = false) {
    containerTransactions.innerHTML = '';

    const tranForSort = sort ? acc.transactions.slice().sort((a, b) => a - b) : acc.transactions;



    tranForSort.forEach(function (tran, i) {
        const type = tran > 0 ? 'deposit' : 'withdrawal';

        const tranDate = new Date(acc.transactionsDates[i]);
        const year = tranDate.getFullYear();
        const month = `${tranDate.getMonth()}`.padStart(2, 0);
        const day = `${tranDate.getDate()}`.padStart(2, 0);
        const displayDate = `${year}/${month}/${day}`;

        const html = `
            <div class="transactions__row">
                <div class="transactions__type transactions__type--${type}">${i + 1} ${type}</div>
                <div class="transactions__date">${displayDate}</div>
                <div class="transactions__value">${tran.toFixed(2)}$</div>
            </div>
        `;
        containerTransactions.insertAdjacentHTML('afterbegin', html);

        // styling odd transaction rows
        [...document.querySelectorAll('.transactions__row')].forEach(function (row, i) {
            i % 2 !== 0 ? row.style.backgroundColor = 'rgb(230, 230, 230)' : row.style.backgroundColor = 'transparent';
        })
    })
}

/***** Displaying Balance ********/
const displayBalance = function (accs) {
    accs.balanceAcc = accs.transactions.reduce((acc, cur) => acc + cur);
    labelBalance.textContent = `${accs.balanceAcc.toFixed(2)} $`;
}

/***** Displaying Overview ********/
const calcDisplayOverview = function (accs) {
    const income = accs.transactions
        .filter(tran => tran > 0)
        .reduce((acc, tran) => acc + tran, 0);

    const outcome = Math.abs(accs.transactions
        .filter(tran => tran < 0)
        .reduce((acc, tran) => acc + tran, 0));

    // in our Banklist, only interests more than 4% will be considered as a user's total interest amount
    const interest = accs.transactions
        .filter(tran => tran > 0)
        .map(dep => (dep * accs.interestRate) / 100)
        .filter(int => int >= 4)
        .reduce((acc, int) => acc + int, 0);

    labelOverviewIn.textContent = `${income.toFixed(2)} $`;
    labelOverviewOut.textContent = `${outcome.toFixed(2)} $`;
    labelOverviewInterest.textContent = `${interest.toFixed(2)} $`;
}

/***** Username ********/
const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.client
            .toLowerCase()
            .split(" ")
            .map(word => word[0]
            ).join("");
    });
};

createUsernames(accounts);

/***** Login ********/

let currentAccount;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    hideErrorMessage();

    // Check username
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

    if (inputLoginUsername.value.trim() === '') {
        showErrorMessage('Username is empty');
        return;
    } else if (!currentAccount) {
        showErrorMessage('Username doesn\'t exist');
        return;
    }

    if (currentAccount.pin === Number(inputLoginPin.value)) {
        const firstName = currentAccount.client.split(' ')[0];
        labelIntroSentence.textContent = (currentAccount.username === 'rn') ? `Hey, Rafa!` : `Hello Again, ${firstName}`;

        containerApp.style.opacity = 1;

        inputLogins.forEach(input => {
            input.value = '';
            input.blur();
        });

        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const day = `${date.getDate()}`.padStart(2, 0);
        const hour = `${date.getHours()}`.padStart(2, 0);
        const min = `${date.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${year}/${month}/${day}, ${hour}:${min}`;

        startSessionTimer();

        displayData(currentAccount);

        toggleLogin();
    } else {
        showErrorMessage('The PIN is incorrect');
    }
});

/***** Logout ********/

logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = undefined;

    resetUI();

    clearInterval(countdownTimer);

    toggleLogin();
});

/***** Transfer ********/

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiveAccount = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount <= 0) {
        if (smallWidth) {
            showActionErrorMessage('Value is incorrect');
        } else {
            showErrorMessage('Value is incorrect');
        }
    } else if (currentAccount.balanceAcc < amount) {
        if (smallWidth) {
            showActionErrorMessage('Balance limit');
        } else {
            showErrorMessage('Balance limit');
        }
    } else if (!receiveAccount) {
        if (smallWidth) {
            showActionErrorMessage('Recipient doesn\'t exist');
        } else {
            showErrorMessage('Recipient doesn\'t exist');
        }
    } else if (receiveAccount?.username === currentAccount.username) {
        if (smallWidth) {
            showActionErrorMessage('You can\'t transfer to yourself');
        } else {
            showErrorMessage('You can\'t transfer to yourself');
        }
    } else {
        currentAccount.transactions.push(-amount);
        receiveAccount.transactions.push(amount);

        currentAccount.transactionsDates.push(new Date().toISOString());
        receiveAccount.transactionsDates.push(new Date().toISOString());

        displayData(currentAccount);
    }
})

/***** Borrow ********/

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (amount <= 0) {
        if (smallWidth) {
            showActionErrorMessage('Value is incorrect');
        } else {
            showErrorMessage('Value is incorrect');
        }
    } else if (!currentAccount.transactions.some(tran => tran >= amount * 0.05)) {
        if (smallWidth) {
            showActionErrorMessage('More than 5% of deposit');
        } else {
            showErrorMessage('More than 5% of deposit');
        }
    } else if (amount === 0) {
        if (smallWidth) {
            showActionErrorMessage('Enter a value');
        } else {
            showErrorMessage('Enter a value');
        }
    } else {
        currentAccount.transactions.push(amount);

        currentAccount.transactionsDates.push(new Date().toISOString());

        displayData(currentAccount);
    }

    inputLoanAmount.value = '';
})

/***** Terminating account ********/

btnTerminate.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputTerminateUsername.value !== currentAccount.username) {
        if (smallWidth) {
            showActionErrorMessage('Invalid username');
        } else {
            showErrorMessage('Invalid username');
        }
    } else if (Number(inputTerminatePin.value) !== currentAccount.pin) {
        if (smallWidth) {
            showActionErrorMessage('Invalid PIN');
        } else {
            showErrorMessage('Invalid PIN');
        }
    } else {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
        labelIntroSentence.textContent = 'Log into your account';

        currentAccount = undefined;
        toggleLogin();
    }

    inputTerminateUsername.value = inputTerminatePin.value = '';
})

/***** Sort ********/

let sorting = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    displayTransactions(currentAccount, !sorting);
    sorting = !sorting;
})

/***** Logout Timer ********/

let sessionTimeout;
let timeLeft = 0;
let countdownTimer;

function startSessionTimer() {
    clearInterval(countdownTimer);

    sessionTimeout = 600;
    timeLeft = sessionTimeout;

    countdownTimer = setInterval(function () {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdownTimer);
            handleSessionExpired();
        } else {
            updateSessionTimerDisplay(timeLeft);
        }
    }, 1000);
}

function updateSessionTimerDisplay(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    labelTimer.textContent = formattedTime;
}

function handleSessionExpired() {
    containerApp.style.opacity = 0;
    labelIntroSentence.textContent = 'Log into your account';
}