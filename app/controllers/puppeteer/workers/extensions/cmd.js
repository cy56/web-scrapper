const AUTHS = {
    partner: 'RB88',
    username: 'data01',
    password: 'aaaa1111'
}

const PAGES = {
    login: 'http://bo.flashtechsolution.net/',
    target: 'http://bo.flashtechsolution.net/Admin/Report/LicenseeWinLose.aspx',
    main: 'http://bo.flashtechsolution.net/index.aspx',
    logout: 'http://bo.flashtechsolution.net/main/logout.ashx'
};

const SELECTORS = {
    partner: '#partnerCode',
    username: '#userName',
    password: '#password',
    login: '#btn-login',
    logout: 'body > header > div.userinfo > span.logout > a',
    currency: '#currency',
    dateFrom: '#date-from',
    dateTo: '#date-to',
    submit: '#btn-submit',
    exportReport: '#export-menu > ul > li:nth-child(1)',
    downloadButton: '#export-menu > button',
    drillDownList: 'a[data-type="winlose"]'
};

const SOURCES = {
    tableGray: '.bg-gray',
    tableLight: '.bg-gray-light'
};

module.exports = {
    auths: AUTHS,
    selectors: SELECTORS,
    pages: PAGES,
    sources: SOURCES
};