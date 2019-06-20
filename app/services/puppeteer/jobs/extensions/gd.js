//Pages
const LOGIN_PAGE = 'http://gdbackoffice.fastnoodle88.com/colds/merchantreportsite/login.php';

//Elements
const MERCHANT_SELECTOR = '#merchantCode';
const ACCOUNT_SELECTOR = 'body > div > div.Div1b > div > label:nth-child(4) > div.Div1b1_TxtBox > input.textField';
const PASSWORD_SELECTOR = '#psw';
const LOGIN_SELECTOR = '#loginBtn';
const REPORT_SELECTOR ='a[onclick="openNewPNLReport();"]';
const LOGOUT_SELECTOR ='#topMenu > div > div > a:nth-child(1) > font > u';
const RECORD_SELECTOR = '#dataDisplay > div:nth-child(3)';
const START_DATE = '#fromdatepicker';
const END_DATE = '#todatepicker';
const RUN_REPORT = '#searchBtn';
const TABLE_SELECTOR = '.tableStyle tr';

//Configs
const VENDOR = 'RB88';

const PAGES = {
    login: LOGIN_PAGE
}

const SELECTORS = {
    merchant: MERCHANT_SELECTOR,
    account: ACCOUNT_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    record: RECORD_SELECTOR,
    table: TABLE_SELECTOR,
    start: START_DATE,
    end: END_DATE,
    runReport: RUN_REPORT
}

const CONFIGS = {
    vendor: VENDOR
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS,
    configs: CONFIGS
};