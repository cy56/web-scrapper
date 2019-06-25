// Pages
const LOGIN_PAGE = 'http://rb88-sfbo.imsbbo.com/Account/Login/';
const REPORT_PAGE = 'http://rb88-sfbo.imsbbo.com/Report/Index';

// Elements
const USERNAME_SELECTOR = '#UserName';
const PASSWORD_SELECTOR = '#Password';
const CAPTCHA_SELECTOR = '#code';
const VALIDATION_SELECTOR = '#CaptchaText';
const LOGIN_SELECTOR = '#btnSubmit';
const LOGOUT_SELECTOR = 'a[href="/Account/Logout"]';
const START_DATE = '#SearchDateFrom';
const END_DATE = '#SearchDateTo';
const FILTER_SHAREHOUSE = '#SearchIsHousePlayer';
const RUN_REPORT = '#submitButton';
const DRILL_DOWN = '#ReportTable > tbody > tr > td:nth-child(2) > a';
const TABLE_SELECTOR = 'table#ReportTable tbody > tr';

const PAGES = {login:LOGIN_PAGE, report: REPORT_PAGE};
const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
    validation: VALIDATION_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    start: START_DATE,
    end: END_DATE,
    filterShareHouse: FILTER_SHAREHOUSE,
    runReport: RUN_REPORT,
    drillDown: DRILL_DOWN,
    table: TABLE_SELECTOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}