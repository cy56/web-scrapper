// Pages
const LOGIN_PAGE = 'https://kiosk.mightypanda88.com/';

// Elements
const USERNAME_SELECTOR = '#logintable > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="text"]';
const PASSWORD_SELECTOR = '#logintable > tbody > tr:nth-child(4) > td:nth-child(2) > input[type="password"]';
const LOGIN_SELECTOR = '#logintable > tbody > tr:nth-child(5) > td:nth-child(2) > input';
const LOGOUT_SELECTOR = '#logout';
const REPORT_SELECTOR = 'a[href="game_stats_report.php"]';
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

const PAGES = {
    login: LOGIN_PAGE
};

const SELECTORS = {
    username:USERNAME_SELECTOR,
    password:PASSWORD_SELECTOR,
    login:LOGIN_SELECTOR,
    logout:LOGOUT_SELECTOR,
    report:REPORT_SELECTOR,
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