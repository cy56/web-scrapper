const BaseParser = require('./master/baseParser');

class SBT extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = data[1].toLowerCase();
        let players = this.resolveValue(data[5]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 2);
        let freeBet = null;
        let actualTurnover = null;
        let playerWinloss = this.resolveValue(data[6], 2) * (-1);
        let totalComboBonus = this.resolveValue(data[10], 2);
        let winningPercent = this.resolveValue(data[8], 2) * (-1);

        return this.autoWireData({ currency, players, bets, turnover, freeBet, actualTurnover, playerWinloss, totalComboBonus, winningPercent });
    }

    resolveForHydra(data) {
        let currency = this.resolveValue(data[1]).toLowerCase();
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[4], 2);
        let freeBet = this.resolveValue(data[5], 2);
        let actualTurnover = this.resolveValue(data[6], 2);
        let playerWinloss = this.resolveValue(data[7], 2);
        let totalComboBonus = this.resolveValue(data[8], 2);
        let winningPercent = this.resolveValue(data[9], 2);

        return this.autoWireData({ currency, players, bets, turnover, freeBet, actualTurnover, playerWinloss, totalComboBonus, winningPercent });
    }
}

module.exports = SBT;