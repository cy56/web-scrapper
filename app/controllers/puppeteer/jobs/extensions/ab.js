// Auths
const USERNAME = 'rbdata03';
const PASSWORD = 'Asdf1234@';
// Pages
const LOGIN_PAGE = 'https://ams.allbetgaming.net';
// Elements
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const VALIDATION_SELECTOR = '#validateCode';
const CAPTCHA_SELECTOR = '#validation_code_img';
const LOGIN_SELECTOR = '#submissionButton';
const LOGOUT_SELECTOR = 'a[href="/j_spring_security_logout"]';
const REPORT_SELECTOR ='a[rel="agent-report-46095-V11"]';
const START_DATE = 'input[name="startTime"]';
const END_DATE = 'input[name="endTime"]';
const RUN_REPORT = '#pagerForm > div > div > div > ul > li:nth-child(1) > div > div > button';
const TABLE_SELECTOR = 'table#profitReportTable tr';

const AUTHS = {
    username: USERNAME,
    password: PASSWORD
}

const PAGES = {
    login: LOGIN_PAGE
}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    validation: VALIDATION_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
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