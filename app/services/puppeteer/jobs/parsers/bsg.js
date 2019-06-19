const BaseParser = require('./master/baseParser');

class BSG extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = this.currency;
        let players = null;
        let bets = this.resolveValue(data[6]);
        let type = 'real';
        let turnover = this.resolveValue(data[3], 2);
        let playerWinloss = (this.resolveValue(data[12], 2)) * (-1);
        let jpContribution = null;
        let jpWins = null;
        let playerWinlossJP = (this.resolveValue(data[12], 2)) * (-1);

        return this.autoWireData({ currency, players, bets, type, turnover, playerWinloss, jpContribution, jpWins, playerWinlossJP });
    }

    resolveForHydra(data) {
        let currency = data[0];
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[3]);
        let type = data[2];
        let turnover = this.resolveValue(data[4], 2);
        let playerWinloss = this.resolveValue(data[5], 2);
        let jpContribution = this.resolveValue(data[6], 2);
        let jpWins = this.resolveValue(data[7], 2);
        let playerWinlossJP = this.resolveValue(data[8], 2);

        return this.autoWireData({ currency, players, bets, type, turnover, playerWinloss, jpContribution, jpWins, playerWinlossJP });
    }
}

module.exports = BSG;