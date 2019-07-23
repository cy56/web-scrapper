const AUTHS = {
    username: 'rb88.net',
    password: 'RB88pepru4N1'
}

const PAGES = {
    login: 'https://report2-sb.betsoftgaming.com/login.jsp',
    report: 'https://report2-sb.betsoftgaming.com/report.do?action=GamesReport'
};

const SELECTORS = {
    username: '#name',
    password: '#password',
    login: 'input[name="submit_but"]',
    logout: 'body > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span.logout > input[type=button]',
    startDate: 'input[name="dateFrom"]',
    endDate: 'input[name="dateTo"]',
    filterCurrency: 'select[name="CurrencyId"]',
    filterCasino: '#subcasinoids',
    filterBank: '#bankids',
    filterAccount: 'select[name="testers"]',
    runReport: 'input[name="show"]',
    table: 'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td > table tr'
};

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}