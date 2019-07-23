const AUTHS = {
    cny: {
        username: 'CNYRB8810',
        password: '1234asdff'
    },
    thb: {
        username: 'THBRB88THB05',
        password: '1234asdf'
    }
}

const PAGES = {
    login: {
        cny: 'https://kiosk.mightypanda88.com/',
        thb: 'https://kiosk.dragonfish88.com/'
    },
    logout: {
        cny: 'https://kiosk.mightypanda88.com/top.php',
        thb: 'https://kiosk.dragonfish88.com/top.php'
    },
    report: {
        cny: 'https://kiosk.mightypanda88.com/game_stats_report.php',
        thb: 'https://kiosk.dragonfish88.com/game_stats_report.php'
    }
};

const SELECTORS = {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    login: 'input[name="Submit"]',
    logout: 'a[id="logout"]',
    reportBoth: '#game_type[value="both"]',
    startDate: '#startdate',
    endDate: '#enddate',
    endTime: '#end_hours',
    showProgressive: '#showjackpot',
    showRealMoney: '#showrealmoney',
    showLiveGames: '#showlivegamestip',
    reportByMonthly: '#reportby[value="monthly"]',
    reportByUsername: '#reportby[value="username"]',
    runReport: 'input[value="Show stats"]',
    exportReport: 'input[name="export"]',
    table: 'table.result tr'
};

module.exports = {
    auths: AUTHS,
    pages:PAGES,
    selectors:SELECTORS
};