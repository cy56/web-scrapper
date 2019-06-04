const libcur = require('../services/currency');
const SOURCE = 'vendor';

class BSG {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.type = data[0];
        this.games = libcur.convert(data[1]);
        this.betAmount = libcur.convert(data[3]);
        this.roundCount = libcur.convert(data[6]);
        this.totalPayout = libcur.convert(data[9]);
        this.winloss = libcur.convert(data[11]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            type: this.type,
            games: this.games,
            betAmount: this.betAmount,
            roundCount: this.roundCount,
            totalPayout: this.totalPayout,
            winloss: this.winloss
        }
    }
}

module.exports = BSG;