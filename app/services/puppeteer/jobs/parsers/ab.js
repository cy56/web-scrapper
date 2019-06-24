const BaseParser = require('./master/baseParser');

class AB extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = 'cny';
        let players = null;
        let bets = null;
        let turnover = this.resolveValue(data[4], 2);
        let playerWinloss = this.resolveValue(data[5], 2);
        let winningPercent = this.resolveValue(data[16], 2);

        return this.autoWireData({ currency, players, bets, turnover, playerWinloss, winningPercent });
    }

    resolveForHydra(data) {
        let currency = data[1];
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[4], 2);
        let playerWinloss = this.resolveValue(data[5], 2);
        let winningPercent = this.resolveValue(data[6], 2);

        return this.autoWireData({ currency, players, bets, turnover, playerWinloss, winningPercent });
    }

}

module.exports = AB;