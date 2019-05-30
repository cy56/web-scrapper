// Pages
const LOGIN_PAGE = 'https://data.agingames.com/';

// Elements
const USERNAME_SELECTOR = '#loginname';
const PASSWORD_SELECTOR = '#passwordSecurity';
const CAPTCHA_SELECTOR = '#login-content > table > tbody > tr:nth-child(6) > td:nth-child(2) > img';
const VALIDATE_SELECTOR = '#captchaCode';
const LOGIN_SELECTOR = '#loginButton';
const LOGOUT_SELECTOR = '#account_contact_top > div.glossymenu > div > ul > li:nth-child(16) > a';
const REPORT_SELECTOR = '#account_contact_top > div.glossymenu > div > ul > li:nth-child(5) > a';

const LIVE_START_DATE = '#FromTime';
const LIVE_END_DATE = '#ToTime';
const LIVE_RUN_REPORT = '#ext-gen915';
const LIVE_TABLE_SELECTOR = 'table.x-grid3-row-table';
const HUNTER_START_DATE = '#FromTime_hunt2';
const HUNTER_END_DATE = '#ToTime_hunt2';
const HUNTER_RUN_REPORT = '#ext-gen1090';
const HUNTER_TABLE_SELECTOR = 'div#grid123_total table.x-grid3-row-table tr';

const PAGES = {login:LOGIN_PAGE}

const SELECTORS = {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    captcha: CAPTCHA_SELECTOR,
    validation: VALIDATE_SELECTOR,
    login: LOGIN_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    live: {
        start: LIVE_START_DATE,
        end: LIVE_END_DATE,
        runReport: LIVE_RUN_REPORT,
        table: LIVE_TABLE_SELECTOR,
    },
    hunter: {
        start: HUNTER_START_DATE,
        end: HUNTER_END_DATE,
        runReport: HUNTER_RUN_REPORT,
        table: HUNTER_TABLE_SELECTOR,
    }
}

module.exports = {
    pages: PAGES,
    selectors: SELECTORS
}