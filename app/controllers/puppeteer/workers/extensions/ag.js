const AUTHS = {
    agl: {
        username: 'gdatat01',
        password: 'asdf1234'
    },
    ag: {
        username: 'grb88int02',
        password: '1234asdf'
    }
}

const PAGES = {
    login: 'https://data.agingames.com/login?lang=en_US',
    report: 'https://data.agingames.com/agent/report'
}

const SELECTORS = {
    username: '#inputAccount',
    password: '#inputPassword',
    login: '#loginButton',
    logout: '#logoutBtn',
    logoutConfirm: '#logoutTipModal > div > div > div.modal-footer > button.sui-btn.btn-danger.btn-large',
    hunter: 'a[href="#tab2"]',
    agl: {
        start: 'input[name="beginTime"]',
        end: 'input[name="endTime"]',
        runReport: '#submitBtn',
        table: '#totalTb tr[ng-repeat="row in totalRecord"]',
    },
    ag: {
        start: 'input[ng-model="hunterForm.beginTime"]',
        end: 'input[ng-model="hunterForm.endTime"]',
        runReport: '#hunterSubmit',
        table: '#hunterTb tr[ng-repeat="row in hunterRecord"]',
    }
}

module.exports = {
    auths: AUTHS,
    pages: PAGES,
    selectors: SELECTORS
}