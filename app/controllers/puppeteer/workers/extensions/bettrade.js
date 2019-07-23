const AUTHS = {
    username: 'RB88001',
    password: 'asdf1234'
}

const PAGES = { login: 'http://btbo.bettrade.co' }

const SELECTORS = {
    username: '#UserName',
    password: '#Password',
    captcha: 'body > div > div.login_box > form > table > tbody > tr:nth-child(4) > td:nth-child(3) > img',
    validation: '#SecurityCode',
    login: 'body > div > div.login_box > form > table > tbody > tr:nth-child(5) > td:nth-child(3) > button',
    logout: 'a[href="/Account/LogOff"]',
    report: 'a[href="/RptLedger?View=Monthly"]',
    member: '#ShowMember',
    currency: '#ShowCurrencyGroup',
    start: '#BTMDateF',
    end: '#BTMDateT',
    runReport: 'li[view="Currency"]',
    table: 'table#ViewList tr.webGridLedgerRow'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}