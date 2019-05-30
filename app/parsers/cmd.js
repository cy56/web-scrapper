const libcur = require('../services/currency');

class CMD {
	constructor(params = { source:null, vendor: null, filename: null, date: null }, data) {
		this.source = params.source;
		this.vendor = params.vendor;
		this.filename = params.filename;
		this.date = params.date;
		this.currency = data[2];
		this.tickets = libcur.convert(data[3]);
		this.turnover = libcur.convert(data[4]);
		this.winloss = libcur.convert(data[5]);
		this.commission = libcur.convert(data[6]);
		this.totalWinloss = libcur.convert(data[7]);
		this.licenseeWinloss = libcur.convert(data[8]);
		this.providerWinloss = libcur.convert(data[9]);
	}

	getResults() {
		return {
			source: this.source,
			vendor: this.vendor,
			filename: this.filename,
			date: this.date,
			currency: this.currency,
			tickets: this.tickets,
			turnover: this.turnover,
			winloss: this.winloss,
			commission: this.commission,
			totalWinloss: this.totalWinloss,
			licenseeWinloss: this.licenseeWinloss,
			providerWinloss: this.providerWinloss
		}
	}
}

module.exports = CMD;