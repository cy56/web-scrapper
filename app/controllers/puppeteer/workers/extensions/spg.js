const AUTHS = {
    merchant: 'RB88',
    username: 'rb88da',
    password: 'da321'
}

const PAGES = { login: 'http://backoffice.hugedolphin.com/' }

const SELECTORS = {
    merchant: '#txtMerchant',
    username: '#loginName',
    password: '#password',
    captcha: '#randomSpan',
    validation: '#randomCode',
    login: '#submitBtn',
    logout: '#dvTabs > ul > li:nth-child(4) > a',
    overallReport: 'body > div.dvCon > div.menuCon > ul > li:nth-child(1) > div',
    report: 'body > div.dvCon > div.menuCon > ul > li:nth-child(1) > ul > li:nth-child(1) > a',
    start: '#beginDate',
    end: '#endDate',
    runReport: '#btnSearch',
    table: 'table#tb_report tbody tr'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}