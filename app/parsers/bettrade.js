const libcur = require('../services/currency');
const SOURCE = 'vendor';

class BETTRADE {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.currency = data[1];
        this.ticket = libcur.convert(data[2]),
        this.stake = libcur.convert(data[3]),
        this.buyBackAmount = libcur.convert(data[4]),
        this.clientComm = libcur.convert(data[5]),
        this.betWinloss = libcur.convert(data[6]),
        this.clientWinloss = libcur.convert(data[7]),
        this.memberWinloss = libcur.convert(data[8])
    }

    getResults() {
        return {
            source: this.source, 
            vendor: this.vendor,
            filename: this.filename,
            date: this.date, 
            currency: this.currency, 
            ticket: this.ticket, 
            stake: this.stake, 
            buyBackAmount: this.buyBackAmount, 
            clientComm: this.clientComm, 
            betWinloss: this.betWinloss, 
            clientWinloss: this.clientWinloss, 
            memberWinloss: this.memberWinloss
        }
    }
}

module.exports = BETTRADE;