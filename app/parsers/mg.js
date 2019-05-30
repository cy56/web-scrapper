const libcur = require('../services/currency');
const SOURCE = 'vendor';

class MG {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.sessionCasino = data[0];
        this.currency = data[1];
        this.players = libcur.convert(data[2]);
        this.games = libcur.convert(data[3]);
        this.wagers = libcur.convert(data[4]);
        this.wagerAmount = libcur.convert(data[5]);
        this.payouts = libcur.convert(data[6]);
        this.payoutAmount = libcur.convert(data[7]);
        this.progressive = libcur.convert(data[8]);
        this.grossGameRevenue = libcur.convert(data[9]);
        this.grossMargin = libcur.convert(data[10]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            sessionCasino: this.sessionCasino,
            currency: this.currency,
            players: this.players,
            games: this.games,
            wagers: this.wagers,
            wagerAmount: this.wagerAmount,
            payouts: this.payouts,
            payoutAmount: this.payoutAmount,
            progressive: this.progressive,
            grossGameRevenue: this.grossGameRevenue,
            grossMargin: this.grossMargin
        }
    }
}

module.exports = MG;