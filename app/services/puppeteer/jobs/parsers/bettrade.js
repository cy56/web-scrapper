const BaseParser = require('./master/baseParser');

class BETTRADE extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = data[1];
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let stake = null;
        let actualStake = this.resolveValue(data[4], 2);
        let bbAmount = this.resolveValue(data[5], 2);
        let betWinloss = this.resolveValue(data[7], 2);
        let commission = this.resolveValue(data[6], 2);
        let settlementAmount = this.resolveValue(data[8], 2);

        return this.autoWireData({ currency, players, bets, stake, actualStake, bbAmount, betWinloss, commission, settlementAmount });
    }

    resolveForHydra(data) {
        let currency = data[1];
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let stake = this.resolveValue(data[4], 2);
        let actualStake = this.resolveValue(data[5], 2);
        let bbAmount = this.resolveValue(data[6], 2);
        let betWinloss = this.resolveValue(data[7], 2);
        let commission = this.resolveValue(data[8], 2);
        let settlementAmount = this.resolveValue(data[9], 2);

        return this.autoWireData({ currency, players, bets, stake, actualStake, bbAmount, betWinloss, commission, settlementAmount });
    }
}

module.exports = BETTRADE;