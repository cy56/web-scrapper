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
    start: '#ctl00_content_txtDateFrom',
    end: '#ctl00_content_txtDateTo',
    export: '#ctl00_content_btnExportCSV'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}