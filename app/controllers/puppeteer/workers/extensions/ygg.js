const AUTHS = {
    first: {
        username: 'gb2bc',
        password: 'BkfMAjgtfJ5SB4suy8PK'
    },
    second: {
        username: 'fedrick.chan@gb2bc',
        password: '23B41E99'
    }
}

const PAGES = {
    login: 'https://bo-prod-sg.ygg-7ehd83n.com/backoffice/login.xhtml'
};

const SELECTORS = {
    username: 'input[name="login:uid"]',
    password: 'input[name="login:pwd"]',
    login: 'button[name="login:loginBtn"]',
    logout: 'i.icon-thermostat1',
    report: 'i.icon-calendar',
    reportOperator: 'a[href="/backoffice/reports/operatorProfitReport.xhtml"]',
    startDate: 'input[name="filterForm:calendarFrom_input"]',
    endDate: 'input[name="filterForm:calendarTo_input"]',
    filterGroup: 'select[name="filterForm:j_idt142_input"]',
    filterBrand: 'select[name="filterForm:j_idt146_input"]',
    runReport: 'button[name="filterForm:j_idt175"]',
    table: 'tbody#resultTable_data tr'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}