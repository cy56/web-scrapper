const libcur = require('../../../services/currency');
const SOURCE = 'vendor';

class GEN {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[0];
        this.type = (data[1] !== 'Sea Raider') ? 'slot' : 'fish';
        this.uap = libcur.convert(data[2]);
        this.spin = libcur.convert(data[3]);
        this.betAmount = libcur.convert(data[5]);
        this.winloss = libcur.convert(data[7]);
        this.rtp = libcur.convert(data[8]);
        this.uapSpin = libcur.convert(data[9]);
        this.uapBet = libcur.convert(data[11]);
        this.betSpin = libcur.convert(data[13]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            date: this.date,
            filename: this.filename,
            currency: this.currency,
            type: this.type,
            uap: this.uap,
            spin: this.spin,
            betAmount: this.betAmount,
            winloss: this.winloss,
            rtp: this.rtp,
            uapSpin: this.uapSpin,
            uapBet: this.uapBet,
            betSpin: this.betSpin
        }
    }
}

module.exports = GEN;