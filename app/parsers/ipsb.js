const libcur = require('../services/currency');
const SOURCE = 'vendor';

class IPSB {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.buyBackTickets = libcur.convert(data[2]);
        this.actualStake = libcur.convert(data[3]);
        this.buyBackAmount = libcur.convert(data[4]);
        this.clientComm = libcur.convert(data[5]);
        this.winloss = libcur.convert(data[6]);
        this.clientWinloss = libcur.convert(data[7]);
        this.grossWinloss = libcur.convert(data[8]);
        this.memberWinloss = libcur.convert(data[9]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            currency: this.currency,
            buyBackTickets: this.buyBackTickets,
            actualStake: this.actualStake,
            buyBackAmount: this.buyBackAmount,
            clientComm: this.clientComm,
            winloss: this.winloss,
            clientWinloss: this.clientWinloss,
            grossWinloss: this.grossWinloss,
            memberWinloss: this.memberWinloss
        }
    }
}

module.exports = IPSB;