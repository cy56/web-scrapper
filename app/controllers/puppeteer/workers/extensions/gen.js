const AUTHS = {
    username: 'Fun88Admin',
    password: '123456'
}

const PAGES = {
    login: 'https://krug-bo.star0ad.com/'
};

const SELECTORS = {
    username: '#userName',
    password: '#password',
    login: '#root > div > div > div > div > div.panel-body > form > div:nth-child(3) > div > div > span > button',
    profile: '#basic-nav-dropdown',
    logout: '#root > div > div > header > nav > div.nav-wrapper > ul.nav.navbar-nav.navbar-right > li > ul > li > a',
    report: '#root > div > div > aside > div > nav > ul > li:nth-child(3) > div.ant-menu-submenu-title',
    gameReport: 'li.ant-menu-item',
    startDate: '#root > div > div > section > div > div.sc-htpNat.aFPWW > form > div:nth-child(3) > div:nth-child(1) > div > div.ant-form-item-control-wrapper > div > span > span > div > input',
    endDate: '#root > div > div > section > div > div.sc-htpNat.aFPWW > form > div:nth-child(3) > div:nth-child(3) > div > div.ant-form-item-control-wrapper > div > span > span > div > input',
    dateValue: '.ant-calendar > .ant-calendar-panel > .ant-calendar-input-wrap > .ant-calendar-date-input-wrap > .ant-calendar-input',
    datepicker: 'tbody.ant-calendar-tbody tr td',
    filterCurrency: '#reportCurrency',
    filterViewBy: '#viewBy',
    filterBetCurrency: '#betCurrency',
    filterList: 'ul[role="listbox"] li',
    runReport: '.content-wrapper > .sc-htpNat > .clearfix > .mt-lg > .btn-primary',
    table: 'table.ant-table-fixed tr.ant-table-row'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};
