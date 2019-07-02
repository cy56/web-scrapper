const BaseParser = require('./master/baseParser');

class GEN extends BaseParser {
    constructor(params, items) {
        super(params);
        this.cleanData(items);
    }

    cleanData(items) {
        let tmp = [];
        for (let index = 0; index < items.length; index++) {
            if(this.source.toLowerCase() !== 'hydra') {
                tmp.push(this.resolveForVendor(items[index]));
                continue;
            }
            this.datas.push(this.resolveForHydra(items[index]));
        }

        if (tmp.length !== 0) {
            const keys = ['currency', 'type'];
            const values = ['players', 'bets', 'turnover', 'validTurnover', 'playerWinloss'];
            let hash = Object.create(null);
            tmp.forEach((obj) => {
                let key = keys.map(function (k) { return obj[k]; }).join('|');
                if (!hash[key]) {
                    hash[key] = { currency: obj.currency, type: obj.type, date:obj.date, filename:obj.filename, brand:obj.brand, source:obj.source, players: 0, bets: 0, turnover: 0, validTurnover: 0, playerWinloss: 0, jackpotWinloss: null, jackpotContribution: null, playerWinlossJP: null };
                    this.datas.push(hash[key]);
                }
                values.forEach(function (k) { hash[key][k] += obj[k]; });
            });
        }
    }

    resolveForVendor(data) {
        let currency = data[0];
        let type = (data[1] !== 'Sea Raider') ? 'rng' : 'fish';
        let players = this.resolveValue(data[2]);
        let bets = this.resolveValue(data[3]);
        let turnover = this.resolveValue(data[5], 2);
        let validTurnover = this.resolveValue(data[5], 2);
        let playerWinloss = (this.resolveValue(data[7], 2)) * (-1);
        let jackpotWinloss = null;
        let jackpotContribution = null;
        let playerWinlossJP = null;

        return this.autoWireData({ currency, type, players, bets, turnover, validTurnover, playerWinloss, jackpotWinloss, jackpotContribution, playerWinlossJP });
    }

    resolveForHydra(data) {
        let currency = data[1];
        let type = (data[2] ==='RNG') ? data[2].toLowerCase() : 'fish';
        let players = this.resolveValue(data[3]);
        let bets = this.resolveValue(data[4]);
        let turnover = this.resolveValue(data[5]);
        let validTurnover = this.resolveValue(data[6]);
        let playerWinloss = this.resolveValue(data[7]);
        let jackpotWinloss = this.resolveValue(data[8]);
        let jackpotContribution = this.resolveValue(data[9]);
        let playerWinlossJP = this.resolveValue(data[10]);

        return this.autoWireData({ currency, type, players, bets, turnover, validTurnover, playerWinloss, jackpotWinloss, jackpotContribution, playerWinlossJP });
    }
}

module.exports = GEN;