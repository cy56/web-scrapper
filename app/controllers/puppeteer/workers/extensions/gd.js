const AUTHS = {
    partner: 'RB88SW',
    username: 'data01',
    password: 'asdf1234'
}

const PAGES = {
    login: 'http://gdbackoffice.fastnoodle88.com/colds/merchantreportsite/login.php'
}

const SELECTORS = {
    merchant: '#merchantCode',
    account: 'body > div > div.Div1b > div > label:nth-child(4) > div.Div1b1_TxtBox > input.textField',
    password: '#psw',
    login: '#loginBtn',
    logout: '#topMenu > div > div > a:nth-child(1) > font > u',
    report: 'a[onclick="openNewPNLReport();"]',
    record: '#dataDisplay > div:nth-child(3)',
    table: '.tableStyle tr',
    start: '#fromdatepicker',
    end: '#todatepicker',
    runReport: '#searchBtn'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
};