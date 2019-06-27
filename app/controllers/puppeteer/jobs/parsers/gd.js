const BaseParser = require('./master/baseParser');

class GD extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let type = 'live';
        let currency = data[1].toLowerCase();
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[4], 2);
        let tipsAmount = this.resolveValue(data[7], 2);
        let jpContribution = null;
        let jpWins = null
        let playerWinloss = this.resolveValue(data[6], 2);
        let playerWinlossJP = null;
        let winningPercent = this.resolveValue((playerWinloss / turnover) * 100, 2);

        return this.autoWireData({ type, currency, players, bets, turnover, tipsAmount, playerWinloss, winningPercent, jpContribution, jpWins, playerWinlossJP });
    }

    resolveForHydra(data) {
        let type = 'live';
        let currency = data[1].toLowerCase();
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[4], 2);
        let tipsAmount = null;
        let jpContribution = null;
        let jpWins = this.resolveValue(data[7], 2);
        let playerWinloss = this.resolveValue(data[6], 4);
        let playerWinlossJP = this.resolveValue(playerWinloss + jpWins, 4);
        let winningPercent = this.resolveValue((playerWinloss / turnover) * 100, 2);

        return this.autoWireData({ type, currency, players, bets, turnover, tipsAmount, playerWinloss, winningPercent, jpContribution, jpWins, playerWinlossJP });
    }

}

module.exports = GD;