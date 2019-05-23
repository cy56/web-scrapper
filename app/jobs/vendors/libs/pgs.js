//Pages
const LOGIN_PAGE = 'https://rb88.pg-bo.net/#/login';

//Elements
const USERNAME_SELECTOR ='#login > div > form > div:nth-child(1) > div > div.text-field > div > div > div.v-input__slot > div > input[type="text"]';
const PASSWORD_SELECTOR = '#login > div > form > div:nth-child(3) > div > div.text-field > div > div > div.v-input__slot > div > input[type="password"]';
const LOGIN_SELECTOR ='#login > div > form > div.login-button > button';
const PROFILE_SELECTOR = 'div[class="user-btn"]';
const LOGOUT_SELECTOR = '#toolbar-user-menu-model > div.cover-bottom > button';
const CURRENCY_REPORT ='#app > div > div > div.body-content-container > div.fixed-side-menu > ul > li:nth-child(2) > div > ul > li:nth-child(3) > ul > li > a > div.nav-item-icon > i';
const CURRENCY_SUMMARY_REPORT = 'a[href="#/reports/currency/summary"]';
const RUN_REPORT = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.filter-group-button > div:nth-child(2) > button';
const START_DATE = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descleft > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]';
const END_DATE ='#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descright > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]';
const TABLE_SELECTOR = 'tbody#ele-table-body tr';

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    username:USERNAME_SELECTOR,
    password:PASSWORD_SELECTOR,
    login:LOGIN_SELECTOR,
    profile: PROFILE_SELECTOR,
    logout:LOGOUT_SELECTOR,
    reportCurrency: CURRENCY_REPORT,
    reportCurrencySum: CURRENCY_SUMMARY_REPORT,
    runReport: RUN_REPORT,
    startDate: START_DATE,
    endDate: END_DATE,
    table: TABLE_SELECTOR
};

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
};