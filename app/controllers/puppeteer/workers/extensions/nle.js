//Auths
const USERNAME = 'NLEdata01';
const PASSWORD = 'Asdf1234';

// Pages
const LOGIN_PAGE = 'https://bem.azuritebox.com/';

// Elements
const USERNAME_SELECTOR = '#UserName';
const PASSWORD_SELECTOR = '#Password';
const CAPTCHA_SELECTOR = '#divSimpleCaptcha > img';
const VALIDATION_SELECTOR = '#Captcha';
const VERIFY_SELECTOR = '#btnVerifySimpleCaptcha';
const VERIFY_ERROR = '#captchaError';
const LOGIN_SELECTOR = '#btnLogin';
const LOGOUT_SELECTOR = '#divMainChangePassword > ul > li > ul > li:nth-child(4) > a';
const REPORT_SELECTOR = 'a[data-controllername="ProfitAndLossReport"]';
const START_DATE = '#txtFromDate';
const END_DATE = '#txtToDate';
const RUN_REPORT = '#btnQuery';
const TABLE_SELECTOR = 'table#MainList_-1 tr[data-name="ASIABET88"]';

const AUTHS = {
    username: USERNAME,
    password: PASSWORD
}

const PAGES = {login:LOGIN_PAGE}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
    validation: VALIDATION_SELECTOR,
    verify: VERIFY_SELECTOR,
    verifyError: VERIFY_ERROR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    start: START_DATE,
    end: END_DATE,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}