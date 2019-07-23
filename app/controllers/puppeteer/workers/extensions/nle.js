const AUTHS = {
    username: 'NLEdata01',
    password: 'Asdf1234'
}

const PAGES = { login: 'https://bem.azuritebox.com/' }

const SELECTORS = {
    username: '#UserName',
    password: '#Password',
    captcha: '#divSimpleCaptcha > img',
    validation: '#Captcha',
    verify: '#btnVerifySimpleCaptcha',
    verifyError: '#captchaError',
    login: '#btnLogin',
    logout: '#divMainChangePassword > ul > li > ul > li:nth-child(4) > a',
    report: 'a[data-controllername="ProfitAndLossReport"]',
    start: '#txtFromDate',
    end: '#txtToDate',
    runReport: '#btnQuery',
    table: 'table#MainList_-1 tr[data-name="ASIABET88"]'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}