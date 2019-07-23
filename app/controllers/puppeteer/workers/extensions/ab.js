const TABLE_SELECTOR = '';

const AUTHS = {
    username: 'rbdata03',
    password: 'Asdf1234@'
}

const PAGES = {
    login: 'https://ams.allbetgaming.net'
}

const SELECTORS = {
    username: '#username',
    password: '#password',
    validation: '#validateCode',
    captcha: '#validation_code_img',
    login: '#submissionButton',
    logout: 'a[href="/j_spring_security_logout"]',
    report: 'a[rel="agent-report-46095-V11"]',
    start: 'input[name="startTime"]',
    end: 'input[name="endTime"]',
    runReport: '#pagerForm > div > div > div > ul > li:nth-child(1) > div > div > button',
    table: 'table#profitReportTable tr'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}