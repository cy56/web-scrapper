const libcur = require('../services/currency');
const SOURCE = 'vendor';

class PGS {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.playerCT = libcur.convert(data[2]);
        this.playerNew = libcur.convert(data[3]);
        this.hands = libcur.convert(data[4]);
        this.rounds = libcur.convert(data[5]);
        this.stakes = libcur.convert(data[6]);
        this.playerWinloss = libcur.convert(data[7]);
        this.companyWinloss = libcur.convert(data[8]);
        this.jpContribution = libcur.convert(data[10]);
        this.jpWin = libcur.convert(data[11]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            playerCT: this.playerCT,
            playerNew: this.playerNew,
            hands: this.hands,
            rounds: this.rounds,
            stakes: this.stakes,
            playerWinloss: this.playerWinloss,
            companyWinloss: this.companyWinloss,
            jpContribution: this.jpContribution,
            jpWin: this.jpWin
        }
    }
}

module.exports = PGS;