const AUTHS = {
    username: 'datateam',
    password: 'Asdf1234'
}

const PAGES = {
    login: 'https://gb2bc.bti360.io',
    report: 'https://gb2bc.bti360.io/GamingActivity/?referrer=ReportingAndBI'
};

const SELECTORS = {
    username: '#Username',
    password: '#Password',
    login: '#login-wrap > input.t-btn-submit',
    logout: '#header > div.header-right.display-flex > span',
    confirmLogout: '#QuickMessageConfrimBtn',
    report: '#LMenuNetLoss',
    filterDateRange: 'div[title="Date Range"]',
    filterOperator: 'div[title="RB88Game"]',
    filterUniquePlayer: '#chkShowUniquePlayerData',
    filterFreeBet: '#chkIncludeFreeBets',
    filterStartDate: '#ddlDateFrom > div > div > input',
    filterEndDate: '#ddlDateTo > div > div > input',
    filterCurrency: '#cs-ddlDisplayCurrencyFilter > div.cs-options-wrapper > div > div:nth-child(18)',
    filterGroupBy: 'div.dx-item-content',
    filterGroupByType: 'div.cs-option[title="Currency"]',
    filterGroupByOperator: 'div[title="Operator"]',
    runReport: '#btnSearch',
    table: 'table.dx-datagrid-table tr.dx-data-row'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};

