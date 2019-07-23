const AUTHS = {
    username: 'rb88',
    password: 'ziw38x3@yIK'
}

const PAGES = {
    login: 'https://rb88.pg-bo.net/#/login',
    report: 'https://rb88.pg-bo.net/#/reports/currency/summary'
};

const SELECTORS = {
    username: '#login > div > form > div:nth-child(1) > div > div.text-field > div > div > div.v-input__slot > div > input[type="text"]',
    password: '#login > div > form > div:nth-child(3) > div > div.text-field > div > div > div.v-input__slot > div > input[type="password"]',
    login: '#login > div > form > div.login-button > button',
    profile: 'div[class="user-btn"]',
    logout: '#toolbar-user-menu-model > div.cover-bottom > button',
    filter: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__header > div.filter-header',
    runReport: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.filter-group-button > div:nth-child(2) > button',
    startDate: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descleft > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]',
    startDateCancel: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descleft > div > div.v-menu > div.v-menu__content.theme--light.menuable__content__active.date-picker-dropdown-selection-menu > div.cancel-icon',
    endDate: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descright > div > div.v-menu > div.v-menu__activator > div > div > div.v-input__slot > div > input[type=text]',
    endDateCancel: '#table-currency-summary > div.em--filter-panel > ul > li > div.v-expansion-panel__body > div > div > div.panel-row > div.col.col-3 > div > div.datetime-range-picker > div.desc-cover.date-only > div.descright > div > div.v-menu > div.v-menu__content.theme--light.menuable__content__active.date-picker-dropdown-selection-menu > div.cancel-icon',
    table: 'tbody#ele-table-body tr'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};