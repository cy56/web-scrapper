//Auths
const HUNTER_USERNAME = 'grb88int02';
const HUNTER_PASSWORD = '1234asdf';
const LIVE_USERNAME = 'gdatat01';
const LIVE_PASSWORD = 'asdf1234';

// Pages
const LOGIN_PAGE = 'https://data.agingames.com/login?lang=en_US';
const REPORT_PAGE = 'https://data.agingames.com/agent/report';

// Elements
const USERNAME_SELECTOR = '#inputAccount';
const PASSWORD_SELECTOR = '#inputPassword';
const LOGIN_SELECTOR = '#loginButton';
const LOGOUT_SELECTOR = '#logoutBtn';
const LOGOUT_CONFIRM_SELECTOR = '#logoutTipModal > div > div > div.modal-footer > button.sui-btn.btn-danger.btn-large';
const HUNTER_REPORT_SELECTOR ='a[href="#tab2"]';

const LIVE_START_DATE = 'input[name="beginTime"]';
const LIVE_END_DATE = 'input[name="endTime"]';
const LIVE_RUN_REPORT = '#submitBtn';
const LIVE_TABLE_SELECTOR = '#totalTb tr[ng-repeat="row in totalRecord"]';

const HUNTER_START_DATE = 'input[ng-model="hunterForm.beginTime"]';
const HUNTER_END_DATE = 'input[ng-model="hunterForm.endTime"]';
const HUNTER_RUN_REPORT = '#hunterSubmit';
const HUNTER_TABLE_SELECTOR = '#hunterTb tr[ng-repeat="row in hunterRecord"]';

const AUTHS = {
    agl: {
        username: LIVE_USERNAME,
        password: LIVE_PASSWORD
    },
    ag: {
        username: HUNTER_USERNAME,
        password: HUNTER_PASSWORD
    }
}

const PAGES = {
    login:LOGIN_PAGE,
    report: REPORT_PAGE
}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    logoutConfirm: LOGOUT_CONFIRM_SELECTOR,
    hunter: HUNTER_REPORT_SELECTOR,
    agl: {
        start: LIVE_START_DATE,
        end: LIVE_END_DATE,
        runReport: LIVE_RUN_REPORT,
        table: LIVE_TABLE_SELECTOR,
    },
    ag: {
        start: HUNTER_START_DATE,
        end: HUNTER_END_DATE,
        runReport: HUNTER_RUN_REPORT,
        table: HUNTER_TABLE_SELECTOR,
    }
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}