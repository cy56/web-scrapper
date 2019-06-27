const BaseParser = require('./master/baseParser');

class TGP extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let type = 'rng';
        let currency = data[2].toLowerCase();
        let players = this.resolveValue(data[3]);
        let bets = this.resolveValue(data[4]);
        let turnover = this.resolveValue(data[6], 2);
        let playerWinloss = (this.resolveValue(data[9], 2)) * (-1);
        let winningPercent = (this.resolveValue(data[11], 2)) * (-1);

        return this.autoWireData({ type, currency, players, bets, turnover, playerWinloss, winningPercent });
    }

    resolveForHydra(data) {
        let type = data[1].toLowerCase();
        let currency = data[2].toLowerCase();
        let players = this.resolveValue(data[3]);
        let bets = this.resolveValue(data[4]);
        let turnover = this.resolveValue(data[5], 2);
        let playerWinloss = this.resolveValue(data[6], 2);
        let winningPercent = this.resolveValue(data[7], 2);

        return this.autoWireData({ type, currency, players, bets, turnover, playerWinloss, winningPercent });
    }
}

module.exports = TGP;