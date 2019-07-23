const AUTHS = {
    licensee: 'LT',
    username: 'LT_user03',
    password: 'Welcome123$$'
}

const PAGES = {
    login: 'http://tgpgateway.com/#!/login/licensee'
};

const SELECTORS = {
    licensee: '#code',
    username: '#username',
    password: '#password',
    login: 'body > ui-view > div > div > form > fieldset > div:nth-child(4) > button',
    profile: 'img.nav-user-photo',
    logout: 'a[ng-click="navBarCtrl.logout()"]',
    report: '#sidebar > bo-side-menu > div > div.menu > ul > li:nth-child(2) > a',
    overallReport: '#sidebar > bo-side-menu > div > div.menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a',
    startDate: 'input[name="from"]',
    endDate: 'input[name="end"]',
    endTime: 'select[ng-model="vm.endHour"]',
    search: 'button[ng-click="vm.showOverallTable()"]',
    table: 'table[ng-table="vm.overallTableParams"] tr.ng-scope'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};