const Model = require('../vendorModel');

class TGP extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'players', 'rounds', 'betAmount', 'turnover', 'companyWinloss', 'commission'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            vendor: {
                type: this.Datatypes.STRING
            },
            filename: {
                type: this.Datatypes.STRING
            },
            date: {
                type: this.Datatypes.DATEONLY
            },
            currency: {
                type: this.Datatypes.STRING
            },
            players: {
                type: this.Datatypes.INTEGER
            },
            rounds: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            turnover: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            validBet: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            companyWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            commission: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            percentComWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source']
            },
            {
                name: 'source_date',
                fields: ['date', 'source']
            }
        ];
        return super.setup();
    }
}

module.exports = TGP;



