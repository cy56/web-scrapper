// AUTHS
const CNY_USERNAME = 'CNYRB8810';
const CNY_PASSWORD = '1234asdff';

const THB_USERNAME = 'THBRB88THB05';
const THB_PASSWORD = '1234asdf';

// Pages
const LOGIN_PAGE_CNY = 'https://kiosk.mightypanda88.com/';
const LOGIN_PAGE_THB = 'https://kiosk.dragonfish88.com/';

// Elements
const USERNAME_SELECTOR = 'input[name="username"]';
const PASSWORD_SELECTOR = 'input[name="password"]';
const LOGIN_SELECTOR = 'input[name="Submit"]';
const LOGOUT_SELECTOR = 'a[id="logout"]';
const REPORT_BOTH_TYPE = '#game_type[value="both"]';
const START_DATE_SELECTOR = '#startdate';
const END_DATE_SELECTOR = '#enddate';
const END_TIME_SELECTOR = '#end_hours';
const SHOW_PROGRESSIVE = '#showjackpot';
const SHOW_REAL_MONEY = '#showrealmoney';
const SHOW_LIVES_GAMES = '#showlivegamestip';
const REPORT_BY_MONTHLY = '#reportby[value="monthly"]';
const RUN_REPORT = 'input[value="Show stats"]';
const TABLE_SELECTOR = 'table.result tr';

const AUTHS = {
    cny: {
        username: CNY_USERNAME,
        password: CNY_PASSWORD
    },
    thb: {
        username: THB_USERNAME,
        password: THB_PASSWORD
    }
}

const PAGES = {
    login: {
        cny: LOGIN_PAGE_CNY,
        thb: LOGIN_PAGE_THB
    },
    logout: {
        cny: `${LOGIN_PAGE_CNY}top.php`,
        thb: `${LOGIN_PAGE_THB}top.php`
    },
    report: {
        cny: `${LOGIN_PAGE_CNY}game_stats_report.php`,
        thb: `${LOGIN_PAGE_THB}game_stats_report.php`
    }
};

const SELECTORS = {
    username:USERNAME_SELECTOR,
    password:PASSWORD_SELECTOR,
    login:LOGIN_SELECTOR,
    logout:LOGOUT_SELECTOR,
    reportBoth: REPORT_BOTH_TYPE,
    startDate: START_DATE_SELECTOR,
    endDate: END_DATE_SELECTOR,
    endTime: END_TIME_SELECTOR,
    showProgressive: SHOW_PROGRESSIVE,
    showRealMoney: SHOW_REAL_MONEY,
    showLiveGames: SHOW_LIVES_GAMES,
    reportByMonthly: REPORT_BY_MONTHLY,
    runReport: RUN_REPORT,
    table: TABLE_SELECTOR
};

module.exports = {
    pages:PAGES,
    selectors:SELECTORS
};