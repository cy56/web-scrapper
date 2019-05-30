const libcur = require('../services/currency');
const SOURCE = 'vendor';

class SBT {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.bets = libcur.convert(data[2]);
        this.turnover = libcur.convert(data[3]);
        this.avgBetAmount = libcur.convert(data[4]);
        this.ggr = libcur.convert(data[5]);
        this.margin = libcur.convert(data[6]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            bets: this.bets,
            turnover: this.turnover,
            avgBetAmount: this.avgBetAmount,
            ggr: this.ggr,
            margin: this.margin
        }
    }
}

module.exports = SBT;