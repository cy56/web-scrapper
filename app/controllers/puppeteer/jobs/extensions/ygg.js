// Auths
const USERNAME1 = 'gb2bc';
const PASSWORD1 = 'BkfMAjgtfJ5SB4suy8PK';
const USERNAME2 = 'fedrick.chan@gb2bc';
const PASSWORD2 = '23B41E99';

// Pages
const LOGIN_PAGE = 'https://bo-prod-sg.ygg-7ehd83n.com/backoffice/login.xhtml';

// Elements
const USERNAME_SELECTOR = 'input[name="login:uid"]';
const PASSWORD_SELECTOR = 'input[name="login:pwd"]';
const LOGIN_SELECTOR = 'button[name="login:loginBtn"]';
const LOGOUT_SELECTOR = 'i.icon-thermostat1';
const REPORT_SELECTOR = 'i.icon-calendar';
const REPORT_OPERATOR = 'a[href="/backoffice/reports/operatorProfitReport.xhtml"]';
const START_DATE = 'input[name="filterForm:calendarFrom_input"]';
const END_DATE = 'input[name="filterForm:calendarTo_input"]';
const FILTER_GROUP = 'select[name="filterForm:j_idt142_input"]';
const FILTER_BRAND = 'select[name="filterForm:j_idt146_input"]';
const RUN_REPORT ='button[name="filterForm:j_idt175"]';
const TABLE_SELECTOR = 'tbody#resultTable_data tr';

const AUTHS = {
    first: {
        username: USERNAME1,
        password: PASSWORD1
    },
    second: {
        username: USERNAME2,
        password: PASSWORD2
    }
}

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    reportOperator: REPORT_OPERATOR,
    startDate: START_DATE,
    endDate: END_DATE,
    filterGroup: FILTER_GROUP,
    filterBrand: FILTER_BRAND,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}