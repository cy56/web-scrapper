//Auths
const LICENSEE = 'LT';
const USERNAME = 'LT_user03';
const PASSWORD = 'Welcome123$$';

//Pages
const LOGIN_PAGE ='http://tgpgateway.com/#!/login/licensee';

//Elements
const LICENSEE_SELECTOR = '#code';
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = 'body > ui-view > div > div > form > fieldset > div:nth-child(4) > button';
const PROFILE_SELECTOR = 'img.nav-user-photo';
const LOGOUT_SELECTOR = 'a[ng-click="navBarCtrl.logout()"]';
const REPORT_SELECTOR = '#sidebar > bo-side-menu > div > div.menu > ul > li:nth-child(2) > a';
const REPORT_OVERALL = '#sidebar > bo-side-menu > div > div.menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a';
const START_DATE = 'input[name="from"]';
const END_DATE = 'input[name="end"]';
const END_TIME = 'select[ng-model="vm.endHour"]';
const SEARCH_SELECTOR ='button[ng-click="vm.showOverallTable()"]';
const TABLE_SELECTOR ='table[ng-table="vm.overallTableParams"] tr.ng-scope';

const AUTHS = {
    licensee: LICENSEE,
    username: USERNAME,
    password: PASSWORD
}

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    licensee: LICENSEE_SELECTOR,
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    login: LOGIN_SELECTOR,
    profile: PROFILE_SELECTOR,
    logout: LOGOUT_SELECTOR,
    report: REPORT_SELECTOR,
    overallReport: REPORT_OVERALL,
    startDate: START_DATE,
    endDate: END_DATE,
    endTime: END_TIME,
    search: SEARCH_SELECTOR,
    table: TABLE_SELECTOR
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};