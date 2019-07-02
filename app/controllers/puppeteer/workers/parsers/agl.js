const BaseParser = require('./master/baseParser');

class AGL extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = (data[0] === '人民幣') ? 'cny' : 'thb';
        let type = 'live';
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 2);
        let playerWinloss = this.resolveValue(data[5], 2);
        let winningPercent = this.resolveValue(( playerWinloss / turnover) * 100, 2);

        return this.autoWireData({ currency, type, players, bets, turnover, playerWinloss, winningPercent });
    }

    resolveForHydra(data) {
        let currency = null;
        let type = null;
        let players = null;
        let bets = null;
        let turnover = null;
        let playerWinloss = null;
        let winningPercent = null;

        return this.autoWireData({ currency, type, players, bets, turnover, playerWinloss, winningPercent });
    }

}

module.exports = AGL;