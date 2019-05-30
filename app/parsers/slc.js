const libcur = require('../services/currency');
const SOURCE = 'vendor';

class SLC {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.betAmount = libcur.convert(data[2]);
        this.winloss = libcur.convert(data[3]);
        this.comm = libcur.convert(data[4]);
        this.commAmount = libcur.convert(data[5]);
        this.totalAmount = libcur.convert(data[6]);
        this.shareComm = libcur.convert(data[7]);
        this.totalShare = libcur.convert(data[8]);
        this.subTotal = libcur.convert(data[9]);
        this.vshareComm = libcur.convert(data[10]);
        this.vshareTotal = libcur.convert(data[11]);
        this.vsubTotal = libcur.convert(data[12]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            betAmount: this.betAmount,
            winloss: this.winloss,
            comm: this.comm,
            commAmount: this.commAmount,
            totalAmount: this.totalAmount,
            shareComm: this.shareComm,
            totalShare: this.totalShare,
            subTotal: this.subTotal,
            vshareComm: this.vshareComm,
            vshareTotal: this.vshareTotal,
            vsubTotal: this.vsubTotal
        }
    }
}

module.exports = SLC;