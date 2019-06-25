const BaseParser = require('./master/baseParser');

class BSG extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = data[1];
        let players = this.resolveValue(data[4]);
        let bets = this.resolveValue(data[5]);
        let turnover = this.resolveValue(data[6], 2);
        let playerWinloss = this.resolveValue(data[8], 2);
        let winningPercent = this.resolveValue(data[9], 2);

        return this.autoWireData({ currency, players, bets, type, turnover, playerWinloss, winningPercent });
    }

    resolveForHydra(data) {
        let currency = data[1];
        let players = this.resolveValue(data[4]);
        let bets = this.resolveValue(data[5]);
        let turnover = this.resolveValue(data[6], 2);
        let playerWinloss = this.resolveValue(data[8], 2);
        let winningPercent = this.resolveValue(data[9], 2);

        return this.autoWireData({ currency, players, bets, type, turnover, playerWinloss, jpContribution, jpWins, playerWinlossJP });
    }
}

module.exports = BSG;