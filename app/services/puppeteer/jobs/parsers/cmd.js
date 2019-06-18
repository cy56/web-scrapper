const BaseParser = require('./master/baseParser');

class CMD extends BaseParser {
	constructor(params, items) {
		super(params);
		this.cleanData(items);
	}

	resolveForVendor(data) {
		let currency = data[2].toLowerCase();
		let players = null;
		let bets = this.resolveValue(data[3]);
		let stake = this.resolveValue(data[4], 2);
		let stakeSold = null;
		let takeBackAmount = null;
		let memberComission = this.resolveValue(data[7]);
		let playerWinloss = this.resolveValue(data[6], 2);
		let winningPercent = null;

		return this.autoWireData({ currency, players, bets, stake, stakeSold, takeBackAmount, memberComission, playerWinloss, winningPercent });
	}

	resolveForHydra(data) {
		let currency = data[1];
		let players = this.resolveValue(data[2]);
		let bets = this.resolveValue(data[3]);
		let stake = this.resolveValue(data[4], 2);
		let stakeSold = this.resolveValue(data[5], 2);
		let takeBackAmount = this.resolveValue(data[6], 2);
		let memberComission = this.resolveValue(data[7], 2);
		let playerWinloss = this.resolveValue(data[8], 2);
		let winningPercent = this.resolveValue(data[9], 2);

		return this.autoWireData({ currency, players, bets, stake, stakeSold, takeBackAmount, memberComission, playerWinloss, winningPercent });
	}
}

module.exports = CMD;