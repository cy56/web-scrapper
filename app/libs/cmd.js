// Pages
const LOGIN_PAGE = 'http://bo.flashtechsolution.net/';
const TARGET_PAGE = 'http://bo.flashtechsolution.net/Admin/Report/LicenseeWinLose.aspx';
const MAIN_PAGE = 'http://bo.flashtechsolution.net/index.aspx';
const LOGOUT_PAGE = 'http://bo.flashtechsolution.net/main/logout.ashx';

// Elements
const PARTNER_SELECTOR = '#partnerCode';
const USERNAME_SELECTOR = '#userName';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = '#btn-login';
const LOGOUT_SELECTOR = 'body > header > div.userinfo > span.logout > a';
const CURRENCY_SELECTOR = '#currency';
const DATE_FROM_SELECTOR = '#date-from';
const DATE_TO_SELECTOR = '#date-to';
const SUBMIT_SELECTOR = '#btn-submit';

//Selectors for save
const SOURCE_DAILY_GRAY = '.bg-gray';
const SOURCE_DAILY_LIGHT = '.bg-gray-light';

const PAGES = {
    login: LOGIN_PAGE,
    target: TARGET_PAGE,
    main: MAIN_PAGE,
    logout: LOGOUT_PAGE
};

const SELECTORS = {
    partner: PARTNER_SELECTOR,
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    currency: CURRENCY_SELECTOR,
    dateFrom: DATE_FROM_SELECTOR,
    dateTo: DATE_TO_SELECTOR,
    submit: SUBMIT_SELECTOR
};

const SOURCES = {
    tableGray: SOURCE_DAILY_GRAY,
    tableLight: SOURCE_DAILY_LIGHT
};

module.exports = {
    selectors: SELECTORS,
    pages: PAGES,
    sources: SOURCES
};