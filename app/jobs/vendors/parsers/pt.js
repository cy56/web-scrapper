const libcur = require('../../../services/currency');
const SOURCE = 'vendor';

class PT {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.players = libcur.convert(data[1]);
        this.games = libcur.convert(data[2]);
        this.betAmount = libcur.convert(data[3]);
        this.realBetAmount = libcur.convert(data[4]);
        this.realBetWin = libcur.convert(data[5]);
        this.realMoneyPayout = libcur.convert(data[6]);
        this.totalWin = libcur.convert(data[7]);
        this.gameIncomeShare = libcur.convert(data[8]);
        this.gamePayout = libcur.convert(data[9]);
        this.progressiveShare = libcur.convert(data[18]);
        this.progressiveWin = libcur.convert(data[19]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            players: this.players,
            games: this.games,
            betAmount: this.betAmount,
            realBetAmount: this.realBetAmount,
            realBetWin: this.realBetWin,
            realMoneyPayout: this.realMoneyPayout,
            totalWin: this.totalWin,
            gameIncomeShare: this.gameIncomeShare,
            gamePayout: this.gamePayout,
            progressiveShare: this.progressiveShare,
            progressiveWin: this.progressiveWin
        }
    }
}

module.exports = PT;