const AUTHS = {
    username: 'f88data',
    password: 'aaaa1111'
}

const PAGES = { login: 'http://ag.2d2u.com/' }

const SELECTORS = {
    username: '#txtUserName',
    password: '#txtPassword',
    captcha: '#imgCaptcha',
    validation: '#txtCaptcha',
    login: '#btLogin',
    logout: '#aLogout',
    report: '#secondary_bar > ul.menu.mblack.fade > li:nth-child(2) > div > div:nth-child(2) > ol > li:nth-child(1) > a',
    start: '#txtDateFrom',
    end: '#txtDateTo',
    filterDate: '#drlDateRange',
    filterType: '#dlReportType',
    runReport: '#btSearch',
    table: '#tbodyListSub tr'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}