const libcur = require('../services/currency');
const SOURCE = 'vendor';

class TGP {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[2];
        this.players = libcur.convert(data[3]);
        this.rounds = libcur.convert(data[4]);
        this.betAmount = libcur.convert(data[5]);
        this.turnover = libcur.convert(data[6]);
        this.validBet = libcur.convert(data[7]);
        this.companyWinloss = libcur.convert(data[8]);
        this.commission = libcur.convert(data[9]);
        this.percentComWinloss = libcur.convert(data[10]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            players: this.players,
            rounds: this.rounds,
            betAmount: this.betAmount,
            turnover: this.turnover,
            validBet: this.validBet,
            companyWinloss: this.companyWinloss,
            commission: this.commission,
            percentComWinloss: this.percentComWinloss
        }
    }
}

module.exports = TGP;