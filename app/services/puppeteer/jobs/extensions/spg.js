// Pages
const LOGIN_PAGE = 'http://backoffice.hugedolphin.com/';

// Elements
const MERCHANT_SELECTOR = '#txtMerchant';
const USERNAME_SELECTOR = '#loginName';
const PASSWORD_SELECTOR = '#password';
const CAPTCHA_SELECTOR = '#randomSpan';
const VALIDATION_SELECTOR ='#randomCode';
const LOGIN_SELECTOR ='#submitBtn';
const LOGOUT_SELECTOR ='#dvTabs > ul > li:nth-child(4) > a';
const REPORT_OVERALL = 'body > div.dvCon > div.menuCon > ul > li:nth-child(1) > div';
const REPORT_SELECTOR = 'body > div.dvCon > div.menuCon > ul > li:nth-child(1) > ul > li:nth-child(1) > a';
const START_DATE = '#beginDate';
const END_DATE = '#endDate';
const RUN_REPORT = '#btnSearch';
const TABLE_SELECTOR = 'table#tb_report tbody tr';

const PAGES = {login:LOGIN_PAGE}

const SELECTORS = {
    merchant: MERCHANT_SELECTOR,
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
    validation: VALIDATION_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    overallReport: REPORT_OVERALL,
    report: REPORT_SELECTOR,
    start: START_DATE,
    end: END_DATE,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}