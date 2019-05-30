const libcur = require('../services/currency');
const SOURCE = 'vendor';

class SAG {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[5];
        this.transactions = libcur.convert(data[6]);
        this.betAmount = libcur.convert(data[7]);
        this.winloss = libcur.convert(data[8]);
        this.rollAmount = libcur.convert([data[9]]);
        this.rollComm = libcur.convert(data[11]);
        this.subLobbyTotal = libcur.convert(data[12]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            transactions: this.transactions,
            betAmount: this.betAmount,
            winloss: this.winloss,
            rollAmount: this.rollAmount,
            rollComm: this.rollComm,
            subLobbyTotal: this.subLobbyTotal
        }
    }
}

module.exports = SAG;