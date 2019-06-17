const BaseParser = require('./master/baseParser');

class PT extends BaseParser {
    constructor(params , items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let type = 'rng';
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 4);
        let totalWin = this.resolveValue(data[7], 4);
        let gameIncomeShare = this.resolveValue(data[8], 4);
        let winningPercent = null;
        let jpContribution = this.resolveValue(data[15], 4);
        let jpWins = this.resolveValue(data[16], 4);
        let playerWinloss = this.resolveValue(totalWin - turnover - jpContribution, 4);
        let playerWinlossJP = this.resolveValue(playerWinloss + jpWins, 4);

        return this.autoWireData({ type, players, bets, turnover, totalWin, gameIncomeShare, playerWinloss, winningPercent, jpContribution, jpWins, playerWinlossJP });
    }

    resolveForHydra(data) {
        let type = 'rng';
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 4);
        let totalWin = this.resolveValue(data[4], 4);
        let gameIncomeShare = this.resolveValue(data[6], 4);
        let playerWinloss = this.resolveValue(data);
        let winningPercent = null;
        let jpContribution = this.resolveValue(data);
        let jpWins = this.resolveValue(data);
        let playerWinlossJP = this.resolveValue(data);
        
        return this.autoWireData({ type, players, bets, turnover, totalWin, gameIncomeShare, playerWinloss, winningPercent, jpContribution, jpWins, playerWinlossJP });
    }

}

module.exports = PT;