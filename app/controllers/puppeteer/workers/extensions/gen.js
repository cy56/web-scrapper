//Auths
const USERNAME = 'Fun88Admin';
const PASSWORD = '123456';

//Pages
const LOGIN_PAGE = 'https://krug-bo.star0ad.com/';

//Elements
const USERNAME_SELECTOR ='#userName';
const PASSWORD_SELECTOR ='#password';
const LOGIN_SELECTOR = '#root > div > div > div > div > div.panel-body > form > div:nth-child(3) > div > div > span > button';
const PROFILE_SELECTOR = '#basic-nav-dropdown';
const LOGOUT_SELECTOR ='#root > div > div > header > nav > div.nav-wrapper > ul.nav.navbar-nav.navbar-right > li > ul > li > a';
const REPORT_SELECTOR = '#root > div > div > aside > div > nav > ul > li:nth-child(3) > div.ant-menu-submenu-title';
const GAME_REPORT_SELECTOR = 'li.ant-menu-item';
const START_DATE = '#root > div > div > section > div > div.sc-htpNat.aFPWW > form > div:nth-child(3) > div:nth-child(1) > div > div.ant-form-item-control-wrapper > div > span > span > div > input';
const END_DATE = '#root > div > div > section > div > div.sc-htpNat.aFPWW > form > div:nth-child(3) > div:nth-child(3) > div > div.ant-form-item-control-wrapper > div > span > span > div > input';
const DATE_VAL = '.ant-calendar > .ant-calendar-panel > .ant-calendar-input-wrap > .ant-calendar-date-input-wrap > .ant-calendar-input';
const DATE_PICKER = 'tbody.ant-calendar-tbody tr td';
const FILTER_CURRENCY = '#reportCurrency';
const FILTER_VIEWBY = '#viewBy';
const FILTER_BET_CURRENCY = '#betCurrency';
const FILTER_LIST = 'ul[role="listbox"] li';
const RUN_REPORT = '.content-wrapper > .sc-htpNat > .clearfix > .mt-lg > .btn-primary';
const TABLE_SELECTOR = 'table.ant-table-fixed tr.ant-table-row';

const AUTHS = {
    username: USERNAME,
    password: PASSWORD
}

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    profile: PROFILE_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    gameReport: GAME_REPORT_SELECTOR,
    startDate: START_DATE,
    endDate: END_DATE,
    dateValue: DATE_VAL,
    datepicker: DATE_PICKER,
    filterCurrency: FILTER_CURRENCY,
    filterViewBy: FILTER_VIEWBY,
    filterBetCurrency: FILTER_BET_CURRENCY,
    filterList: FILTER_LIST,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};