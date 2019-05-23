//Pages
const LOGIN_PAGE = 'https://quickfire-biportal.gameassists.co.uk/User/Login?ReturnUrl=%2f';
const REPORT_PAGE = '#tab-content-1 > div > reports-tab > md-content > div:nth-child(1) > div > div';

//Elements
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = '#loginButton';
const MAIN_MENU_SELECTOR ='button[aria-label="Main Menu"]';
const LOGOUT_SELECTOR ='a[aria-label="Log Out"]';
const REPORT_CASINO_PROFIT ='#reportView_16_Button';
const DATE_FILTER_SELECTOR ='#filter_1_Operator';
const BETWEEN_SELECTOR = '#select_option_133';
const DATE_START_SELECTOR = '#filter_1_Date1 > div.md-datepicker-input-container > input';
const DATE_END_SELECTOR = '#filter_1_Date2 > div.md-datepicker-input-container > input';
const EXTRA_FILTER_SELECTOR ='#addFilter';
const REGISTER_CASINO_SELECTOR ='#select_option_22';
const FILTER_REGISTER_SELECTOR = '#filter_3_MultiSelect';
const FILTER_REGISTER_VALUE ='#select_option_226';
const REPORT_VIEW_CP = 'button[aria-label="Casino Profit"]';
const COL_CUSTOMIZE = '#sideNav > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:nth-child(2)';
const COL_COUNTRY = 'button[aria-label="Session Country"]';
const COL_LANGUAGE = 'button[aria-label="Session Language"]';
const RUN_REPORT_SELECTOR ='#runReportButton';
const TABLE_SELECTOR ='.ag-body-container [role="row"]';

const PAGES = {
    login: LOGIN_PAGE,
    report: REPORT_PAGE
}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    mainMenu: MAIN_MENU_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_CASINO_PROFIT,
    reportCasinoProfit: REPORT_VIEW_CP,
    dateFilter: DATE_FILTER_SELECTOR,
    dateBetween: BETWEEN_SELECTOR,
    dateStart: DATE_START_SELECTOR,
    dateEnd: DATE_END_SELECTOR,
    extraFilter: EXTRA_FILTER_SELECTOR,
    registerCasino: REGISTER_CASINO_SELECTOR,
    filRegister: FILTER_REGISTER_SELECTOR,
    filRegisterVal: FILTER_REGISTER_VALUE,
    runReport: RUN_REPORT_SELECTOR,
    colCustomize: COL_CUSTOMIZE,
    colCountry: COL_COUNTRY,
    colLanguage: COL_LANGUAGE,
    table: TABLE_SELECTOR
}

module.exports = {
    selectors: SELECTORS,
    pages: PAGES
};