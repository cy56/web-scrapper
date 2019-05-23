//Pages
const LOGIN_PAGE = 'http://btbo.bettrade.co ';

//Elements
const USERNAME_SELECTOR = '#UserName';
const PASSWORD_SELECTOR = '#Password';
const CAPTCHA_SELECTOR = 'body > div > div.login_box > form > table > tbody > tr:nth-child(4) > td:nth-child(3) > img';
const VALIDATION_SELECTOR = '#SecurityCode';
const LOGIN_SELECTOR = 'body > div > div.login_box > form > table > tbody > tr:nth-child(5) > td:nth-child(3) > button';
const LOGOUT_SELECTOR = 'a[href="/Account/LogOff"]';
const REPORT_SELECTOR = 'a[href="/RptLedger?View=Monthly"]';
const START_DATE = '#BTMDateF';
const END_DATE = '#BTMDateT';
const RUN_REPORT = 'li[view="Currency"]';
const TABLE_SELECTOR = 'table#ViewList tr.webGridLedgerRow';

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
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}