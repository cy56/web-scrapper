const BaseParser = require('./master/baseParser');

class AG extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    resolveForVendor(data) {
        let currency = 'cny';
        let type = 'fish';
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 2);
        let validTurnover = this.resolveValue(data[4], 2);
        let grossWinAmount = this.resolveValue(data[5], 2);
        let jpSettlement = this.resolveValue(data[6], 2);

        return this.autoWireData({ currency, type, players, bets, turnover, validTurnover, grossWinAmount, jpSettlement });
    }

    resolveForHydra(data) {
        let currency = 'cny';
        let type = 'fish';
        let players = this.resolveValue(data[1]);
        let bets = this.resolveValue(data[2]);
        let turnover = this.resolveValue(data[3], 2);
        let validTurnover = this.resolveValue(data[4], 2);
        let grossWinAmount = this.resolveValue(data[5], 2);
        let jpSettlemnent = this.resolveValue(data[6], 2);

        return this.autoWireData({ currency, type, players, bets, turnover, validTurnover, grossWinAmount, jpSettlemnent });
    }
}

module.exports = AG;