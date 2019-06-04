const libcur = require('../services/currency');
const SOURCE = 'vendor';

class NLE {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[0];
        this.betAmount = libcur.convert(data[1]);
        this.profitLoss = libcur.convert(data[2]);
        this.holdPercent = libcur.convert(data[3]);
        this.uniquePlayer = libcur.convert(data[4]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            betAmount: this.betAmount,
            profitLoss: this.profitLoss,
            holdPercent: this.holdPercent,
            uniquePlayer: this.uniquePlayer
        }
    }
}

module.exports = NLE;