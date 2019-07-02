//Auths
const USERNAME = 'rb88';
const PASSWORD = 'ziw38x3@yIK';

//Pages
const LOGIN_PAGE = 'https://rb88.pg-bo.net/#/login';
const REPORT_PAGE = 'https://rb88.pg-bo.net/#/reports/currency/summary';

//Elements
const USERNAME_SELECTOR ='#login > div > form > div:nth-child(1) > div > div.text-field > div > div > div.v-input__slot > div > input[type="text"]';
const PASSWORD_SELECTOR = '#login > div > form > div:nth-child(3) > div > div.text-field > div > div > div.v-input__slot > div > input[type="password"]';
const LOGIN_SELECTOR ='#login > div > form > div.login-button > button';
const PROFILE_SELECTOR = 'div[class="user-btn"]';
const LOGOUT_SELECTOR = '#toolbar-user-menu-model > div.cover-bottom > button';
const FILTER_SELECTOR = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__header > div.filter-header';
const RUN_REPORT = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.filter-group-button > div:nth-child(2) > button';
const START_DATE = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descleft > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]';
const START_DATE_CANCEL = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descleft > div > div.v-menu > div.v-menu__content.theme--light.menuable__content__active.date-picker-dropdown-selection-menu > div.cancel-icon';
const END_DATE ='#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descright > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]';
const END_DATE_CANCEL = '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descright > div > div.v-menu > div.v-menu__content.theme--light.menuable__content__active.date-picker-dropdown-selection-menu > div.cancel-icon';
const TABLE_SELECTOR = 'tbody#ele-table-body tr';

const AUTHS = {
    username: USERNAME,
    password: PASSWORD
}

const PAGES = {
    login: LOGIN_PAGE,
    report: REPORT_PAGE
};

const SELECTORS = {
    username:USERNAME_SELECTOR,
    password:PASSWORD_SELECTOR,
    login:LOGIN_SELECTOR,
    profile: PROFILE_SELECTOR,
    logout:LOGOUT_SELECTOR,
    filter: FILTER_SELECTOR,
    runReport: RUN_REPORT,
    startDate: START_DATE,
    startDateCancel: START_DATE_CANCEL,
    endDate: END_DATE,
    endDateCancel: END_DATE_CANCEL,
    table: TABLE_SELECTOR
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};