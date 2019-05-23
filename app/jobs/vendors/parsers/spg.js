const libcur = require('../../../services/currency');
const SOURCE = 'vendor';

class SPG {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.bets = libcur.convert(data[2]);
        this.betAmount = libcur.convert(data[3]);
        this.validBetAmount = libcur.convert(data[4]);
        this.jpContribute = libcur.convert(data[5]);
        this.playerWinloss = libcur.convert(data[6]);
        this.profit = libcur.convert(data[7]);
        this.jpWin = libcur.convert(data[8]);
        this.totalIncomeShare = libcur.convert(data[9]);
        this.mvalidBetAmount = libcur.convert(data[10]);
        this.mjpContribute = libcur.convert(data[11]);
        this.mplayerWinloss = libcur.convert(data[12]);
        this.mjpWin = libcur.convert(data[13]);
        this.mtotalIncomeShare = libcur.convert(data[14]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            bets: this.bets,
            betAmount: this.betAmount,
            validBetAmount: this.validBetAmount,
            jpContribute: this.jpContribute,
            playerWinloss: this.playerWinloss,
            profit: this.profit,
            jpWin: this.jpWin,
            totalIncomeShare: this.totalIncomeShare,
            mvalidBetAmount: this.mvalidBetAmount,
            mjpContribute: this.mjpContribute,
            mplayerWinloss: this.mplayerWinloss,
            mjpWin: this.mjpWin,
            mtotalIncomeShare: this.mtotalIncomeShare
        }
    }
}

module.exports = SPG;