const BaseParser = require('./master/baseParser');

class CMD extends BaseParser {
	constructor(params = { source:null, brand:null, vendor: null, filename: null, date: null }, items) {
		super(params);
		this.cleanData(items);
	}

	cleanData(items) {
		for (let index = 0; index < items.length; index++) {
			this.datas.push(items[index]);
		}
	}

	resolveData(data) {
		let currency = (this.source !== 'hydra') ? data[2] : data[1];
		let players = (this.source !== 'hydra') ? 0 : this.resolveValue(data[2]);
		let bets = (this.source !== 'hydra') ? this.resolveValue(data[3]) : this.resolveValue(data[3]);
		let stake = (this.source !== 'hydra') ? this.resolveValue(data[4]) : this.resolveValue(data[4], 4);
		let stakeSold = (this.source !== 'hydra') ? 0 : this.resolveValue(data[5], 4);
		let takeBackAmount = (this.source !== 'hydra') ? 0 : this.resolveValue(data[6], 4);
		let memberComission = (this.source !== 'hydra') ? 0 : this.resolveValue(data[7], 4);
		let playerWinloss = (this.source !== 'hydra') ? 0 : this.resolveValue(data[8], 4);
		let winningPercent = (this.source !== 'hydra') ? 0 : this.resolveValue(data[9], 4);

		return {currency, players, bets, stake, stakeSold, takeBackAmount, memberComission, playerWinloss, winningPercent};
	}

	getResults() {
		return this.datas;
	}
}

module.exports = CMD;