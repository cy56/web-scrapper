// Pages
const LOGIN_PAGE = 'https://gb2bc.bti360.io';

// Elements
const USERNAME_SELECTOR = '#Username';
const PASSWORD_SELECTOR = '#Password';
const LOGIN_SELECTOR = '#login-wrap > input.t-btn-submit';
const LOGOUT_SELECTOR = '#header > div.header-right.display-flex > span';
const LOGOUT_CONFIRM = '#QuickMessageConfrimBtn';
const REPORT_SELECTOR = '#LMenuNetLoss';
const FILTER_DATE_RANGE = 'div[title="Date Range"]';
const FILTER_START_DATE = '#ddlDateFrom > div > div > input';
const FILTER_END_DATE = '#ddlDateTo > div > div > input';
const FILTER_CURRENCY = '#cs-ddlDisplayCurrencyFilter > div.cs-options-wrapper > div > div:nth-child(18)';
const FILTER_GROUP_BY = 'div.dx-item-content';
const FILTER_GROUP_BY_TYPE = 'div.cs-option[title="Currency"]';
const RUN_REPORT = '#btnSearch';
const TABLE_SELECTOR = 'table.dx-datagrid-table tr.dx-data-row';

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    confirmLogout: LOGOUT_CONFIRM,
    report: REPORT_SELECTOR,
    filterDateRange: FILTER_DATE_RANGE,
    filterStartDate: FILTER_START_DATE,
    filterEndDate: FILTER_END_DATE,
    filterCurrency: FILTER_CURRENCY,
    filterGroupBy: FILTER_GROUP_BY,
    filterGroupByType: FILTER_GROUP_BY_TYPE,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
};

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
};

