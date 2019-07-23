const AUTHS = {
    username: 'data@nettium.net',
    password: 'Qwaszx@1234@'
}

const PAGES = {
    login: 'https://quickfire-biportal.gameassists.co.uk/User/Login?ReturnUrl=%2f',
    report: 'https://quickfire-biportal.gameassists.co.uk/Report/?reportId=6&operatorId=41860'
}

const SELECTORS = {
    username: '#username',
    password: '#password',
    login: '#loginButton',
    mainMenu: 'button[aria-label="Main Menu"]',
    logout: 'a[aria-label="Log Out"]',
    reportCasinoProfit: '#reportView_16_Button',
    dateFilter: '#filter_1_Operator',
    dateBetween: '#select_option_133',
    dateStart: '#filter_1_Date1 > div.md-datepicker-input-container > input',
    dateEnd: '#filter_1_Date2 > div.md-datepicker-input-container > input',
    extraFilter: '#addFilter',
    registerCasino: '#select_option_22',
    filRegister: '#filter_3_MultiSelect',
    filRegisterVal: 'md-option[value="4110"]',
    runReport: '#runReportButton',
    colCustomize: '#sideNav > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:nth-child(2)',
    colCountry: 'button[aria-label="Session Country"]',
    colLanguage: 'button[aria-label="Session Language"]',
    table: '.ag-body-container [role="row"]',
    base: '._md-select-backdrop'
}

module.exports = {
    auths: AUTHS,
    selectors: SELECTORS,
    pages: PAGES
};