const BaseParser = require('./master/baseParser');

class CMD extends BaseParser {
	constructor(params, items) {
		super(params);
		this.cleanData(items);
	}

	resolveForVendor(data) {
		let currency = data[2];
		let players = 0;
		let bets = this.resolveValue(data[3]);
		let stake = this.resolveValue(data[4]);
		let stakeSold = 0 ;
		let takeBackAmount = 0;
		let memberComission = 0;
		let playerWinloss = 0
		let winningPercent = 0;

		return {currency, players, bets, stake, stakeSold, takeBackAmount, memberComission, playerWinloss, winningPercent};
	}

	resolveForHydra(data) {
		let currency = data[1];
		let players = this.resolveValue(data[2]);
		let bets = this.resolveValue(data[3]);
		let stake = this.resolveValue(data[4], 4);
		let stakeSold = this.resolveValue(data[5], 4);
		let takeBackAmount = this.resolveValue(data[6], 4);
		let memberComission = this.resolveValue(data[7], 4);
		let playerWinloss = this.resolveValue(data[8], 4);
		let winningPercent = this.resolveValue(data[9], 2);

		return { currency, players, bets, stake, stakeSold, takeBackAmount, memberComission, playerWinloss, winningPercent };
	}
}

module.exports = CMD;