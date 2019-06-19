const BaseParser = require('./master/baseParser');

class PGS extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = data[2];
        let players = this.resolveValue(data[3]);
        let bets = this.resolveValue(data[6]);
        let turnover = this.resolveValue(data[7], 2);
        let playerWinloss = this.resolveValue(data[8], 2);
        let jpContribution = this.resolveValue(data[11], 2);
        let jpWins = this.resolveValue(data[12], 2);
        let playerWinlossJP = this.resolveValue(playerWinloss + jpWins, 2);
        let winningPercent = this.resolveValue(data[10], 2);

        return this.autoWireData({ currency, players, bets, turnover, playerWinloss, jpContribution, jpWins, playerWinlossJP, winningPercent });
    }

    resolveForHydra(data) {
        let currency = data[1];
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[4], 2);
        let playerWinloss = this.resolveValue(data[5], 2);
        let jpContribution = this.resolveValue(data[7], 2);
        let jpWins = this.resolveValue(data[8], 2);
        let playerWinlossJP = this.resolveValue(data[6], 2);
        let winningPercent = this.resolveValue(data[9], 2);

        return this.autoWireData({ currency, players, bets, turnover, playerWinloss, jpContribution, jpWins, playerWinlossJP, winningPercent });
    }
}

module.exports = PGS;