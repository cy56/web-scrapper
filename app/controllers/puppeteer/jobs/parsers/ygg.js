const BaseParser = require('./master/baseParser');

class YGG extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let type = 'real';
        let currency = data[5].toLowerCase();
        let players = this.resolveValue(data[3]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[6], 2);
        let playerWinloss = this.resolveValue(this.resolveValue(data[7], 2) - this.resolveValue(data[6], 2), 2);
        let winningPercent = this.resolveValue((playerWinloss / turnover) * 100, 2);

        return this.autoWireData({ type, currency, players, bets, turnover, playerWinloss, winningPercent });
    }

    resolveForHydra(data) {
        let type = 'real';
        let currency = data[5].toLowerCase();
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 4);
        let playerWinloss = this.resolveValue(totalWin - turnover - jpContribution, 4);
        let winningPercent = null;

        return this.autoWireData({ type, currency, players, bets, turnover, playerWinloss, winningPercent });
    }
}

module.exports = YGG;