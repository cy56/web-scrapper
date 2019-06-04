const libcur = require('../services/currency');
const SOURCE = 'vendor';

class GD
{
    constructor(params = {vendor:null, filename:null, date:null}, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.provider = data[0];
        this.currency = data[1];
        this.activePlayer = libcur.convert(data[2]);
        this.betCount = libcur.convert(data[9]);
        this.betAmount = libcur.convert(data[10]);
        this.validBetAmount = libcur.convert(data[11]);
        this.playerWinLoss = libcur.convert(data[12]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            provider: this.provider,
            date: this.date,
            currency: this.currency,
            activePlayer: this.activePlayer,
            betCount: this.betCount,
            betAmount: this.betAmount,
            validBetAmount: this.validBetAmount,
            playerWinLoss: this.playerWinLoss,
            filename: this.filename
        }
    }
}

module.exports = GD;