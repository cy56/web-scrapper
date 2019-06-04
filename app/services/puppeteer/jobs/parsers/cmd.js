const BaseParser = require('./master/baseParser');

class CMD extends BaseParser {
	constructor(params = { source:null, brand:null, vendor: null, filename: null, date: null }, data) {
		super(params);
		this.currency = (this.source !== 'hydra') ? data[2] : data[1];
		this.players = (this.source !== 'hydra') ? 0 : this.resolveValue(data[2]);
		this.bets = (this.source !== 'hydra') ? this.resolveValue(data[3]) : this.resolveValue(data[3]);
		this.stake = (this.source !== 'hydra') ? this.resolveValue(data[4]) : this.resolveValue(data[4], 4);
		this.stakeSold = (this.source !== 'hydra') ? 0 : this.resolveValue(data[5], 4);
		this.takeBackAmount = (this.source !== 'hydra') ? 0 : this.resolveValue(data[6], 4);
		this.memberComission = (this.source !== 'hydra') ? 0 : this.resolveValue(data[7], 4);
		this.playerWinloss = (this.source !== 'hydra') ? 0 : this.resolveValue(data[8], 4);
		this.winningPercent = (this.source !== 'hydra') ? 0 : this.resolveValue(data[9], 4);
	}

	getResults() {
		return {
			source: this.source,
			brand: this.brand,
			vendor: this.vendor,
			filename: this.filename,
			date: this.date,
			currency: this.currency,
			players: this.players,
			bets: this.bets,
			stake: this.stake,
			stakeSold: this.stakeSold,
			takeBackAmount: this.takeBackAmount,
			memberComission: this.memberComission,
			playerWinloss: this.playerWinloss,
			winningPercent: this.winningPercent
		}
	}
}

module.exports = CMD;