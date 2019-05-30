const libcur = require('../services/currency');
const SOURCE = 'vendor';

class AB {
    constructor(params = { vendor: null, filename: null, date: null }, data) {
        this.source = SOURCE;
        this.vendor = params.vendor;
        this.filename = params.filename;
        this.date = params.date;
        this.class = data[1];
        this.username = data[2];
        this.game = data[3];
        this.betAmount = libcur.convert(data[4]);
        this.winloss = libcur.convert(data[5]);
        this.validBetAmount = libcur.convert(data[6]);
        this.type = data[7];
        this.rebate = libcur.convert(data[8]);
        this.rebateAmount = libcur.convert(data[9]);
        this.netProfitLoss = libcur.convert(data[10]);
        this.sharePercent = libcur.convert(data[11]);
        this.shareBetAmount = libcur.convert(data[12]);
        this.shareWinloss = libcur.convert(data[13]);
        this.shareValidBet = libcur.convert(data[14]);
        this.actualSettlement = libcur.convert(data[15]);
        this.shareWinPercent = libcur.convert(data[16]);
    }

    getResults() {
        return {
            source: this.source,
            vendor: this.vendor,
            filename: this.filename,
            date: this.date,
            class: this.class,
            username: this.username,
            game: this.game,
            betAmount: this.betAmount,
            winloss: this.winloss,
            validBetAmount: this.validBetAmount,
            type: this.type,
            rebate: this.rebate,
            rebateAmount: this.rebateAmount,
            netProfitLoss: this.netProfitLoss,
            sharePercent: this.sharePercent,
            shareBetAmount: this.shareBetAmount,
            shareWinloss: this.shareWinloss,
            shareValidBet: this.shareValidBet,
            actualSettlement: this.actualSettlement,
            shareWinPercent: this.shareWinPercent
        }
    }
}

module.exports = AB;