const AUTHS = {
    username: 'data01',
    password: 'asdf1234'
}

const PAGES = { login: 'http://bo.sa-gaming.net' }

const SELECTORS = {
    username: '#LoginUser_UserName',
    password: '#LoginUser_Password',
    captcha: '#c_login_loginuser_logincaptcha_CaptchaImage',
    validation: '#LoginUser_CaptchaCodeTextBox',
    login: '#LoginUser_LoginButton',
    logout: '#LoginStatus1',
    report: '#liWinLose',
    start: '#tbFromDate',
    end: '#tbToDate',
    btnCurrency: '#lvChild1_5_ctrl0_theimage',
    runReport: '#btnSearch',
    table: 'table#lvChild1_5_Table1 tr.Jnormal-row'
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}