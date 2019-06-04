// Pages
const LOGIN_PAGE = 'http://ag.2d2u.com/';

// Elements
const USERNAME_SELECTOR = '#txtUserName';
const PASSWORD_SELECTOR = '#txtPassword';
const CAPTCHA_SELECTOR = '#imgCaptcha';
const VALIDATION_SELECTOR = '#txtCaptcha';
const LOGIN_SELECTOR = '#btLogin';
const LOGOUT_SELECTOR = '#aLogout';
const REPORT_SELECTOR = '#secondary_bar > ul.menu.mblack.fade > li:nth-child(2) > div > div:nth-child(2) > ol > li:nth-child(1) > a';
const START_DATE = '#txtDateFrom';
const END_DATE = '#txtDateTo';
const FILTER_DATE = '#drlDateRange';
const FILTER_TYPE = '#dlReportType';
const RUN_REPORT = '#btSearch';
const TABLE_SELECTOR = '#tbodyListSub tr';

const PAGES = {login: LOGIN_PAGE}

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
    filterDate: FILTER_DATE,
    filterType: FILTER_TYPE,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}