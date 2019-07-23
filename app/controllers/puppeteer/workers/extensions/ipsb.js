const AUTHS = {
    username: 'datateam',
    password: '1234asdf'
}

const PAGES = { login: 'http://rb88-sfbo.imsbbo.com/Account/Login/', report: 'http://rb88-sfbo.imsbbo.com/Report/Index' };

const SELECTORS = {
    username: '#UserName',
    password: '#Password',
    captcha: '#code',
    validation: '#CaptchaText',
    login: '#btnSubmit',
    logout: 'a[href="/Account/Logout"]',
    start: '#SearchDateFrom',
    end: '#SearchDateTo',
    filterShareHouse: '#SearchIsHousePlayer',
    runReport: '#submitButton',
    drillDown: '#ReportTable > tbody > tr > td:nth-child(2) > a',
    table: 'table#ReportTable tbody > tr'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}