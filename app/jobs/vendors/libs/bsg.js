// Pages
const LOGIN_PAGE = 'https://report2-sb.betsoftgaming.com/login.jsp';
const REPORT_PAGE = 'https://report2-sb.betsoftgaming.com/report.do?action=GamesReport';

// Elements
const USERNAME_SELECTOR = '#name';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = 'input[name="submit_but"]';
const LOGOUT_SELECTOR = 'body > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span.logout > input[type=button]';
const START_DATE = 'input[name="dateFrom"]';
const END_DATE = 'input[name="dateTo"]';
const FILTER_CURRENCY = 'select[name="CurrencyId"]';
const FILTER_CASINO = '#subcasinoids';
const FILTER_BANK = '#bankids';
const RUN_REPORT = 'input[name="show"]';
const TABLE_SELECTOR = 'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > table tr';

const PAGES = {
    login: LOGIN_PAGE,
    report: REPORT_PAGE
};

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    startDate: START_DATE,
    endDate: END_DATE,
    filterCurrency: FILTER_CURRENCY,
    filterCasino: FILTER_CASINO,
    filterBank: FILTER_BANK,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
};

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}