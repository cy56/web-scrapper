const AUTHS = {
    username: 'welton',
    password: 'Password1234'
}

const PAGES = {
    login: 'http://backoffice.staging.luckystar188.biz/',
    reports: {
        pt: 'ReportWinLoss/PTWinLoss.aspx?menuid=700'
    }
}

const SELECTORS = {
    username: '#txtUserName',
    password: '#txtPassword',
    brand: '#DdlBrands',
    login: 'input[name="btnLogin"]',
    start: 'input[name="ctl00$content$txtDateFrom"]',
    end: 'input[name="ctl00$content$txtDateTo"]',
    exportReport: 'input[name="ctl00$content$btnExportCSV"]'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}