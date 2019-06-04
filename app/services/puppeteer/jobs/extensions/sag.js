// Pages
const LOGIN_PAGE = 'http://bo.sa-gaming.net';

// Elements
const USERNAME_SELECTOR = '#LoginUser_UserName';
const PASSWORD_SELECTOR = '#LoginUser_Password';
const CAPTCHA_SELECTOR = '#c_login_loginuser_logincaptcha_CaptchaImage';
const VALIDATION_SELECTOR = '#LoginUser_CaptchaCodeTextBox';
const LOGIN_SELECTOR = '#LoginUser_LoginButton';
const LOGOUT_SELECTOR = '#LoginStatus1';
const REPORT_SELECTOR = '#liWinLose';
const START_DATE = '#tbFromDate';
const END_DATE = '#tbToDate';
const RUN_REPORT = '#btnSearch';
const CURRENCY_BTN = '#lvChild1_5_ctrl0_theimage';
const TABLE_SELECTOR = 'table#lvChild1_5_Table1 tr.Jnormal-row';

const PAGES = {login:LOGIN_PAGE}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
    validation: VALIDATION_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    start: START_DATE,
    end: END_DATE,
    btnCurrency: CURRENCY_BTN,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}