const libcur = require('../../../services/currency');
const SOURCE = 'vendor';

class YGG {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.type = data[1];
        this.betCount = libcur.convert(data[2]);
        this.userCount = libcur.convert(data[3]);
        this.currency = data[5];
        this.betAmount = libcur.convert(data[6]);
        this.wonAmount = libcur.convert(data[7]);
        this.rtp = libcur.convert(data[8]);
        this.profit = libcur.convert(data[9]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            type: this.type,
            betCount: this.betCount,
            userCount: this.userCount,
            currency: this.currency,
            betAmount: this.betAmount,
            wonAmount: this.wonAmount,
            rtp: this.rtp,
            profit: this.profit
        }
    }
}

module.exports = YGG;