const Model = require('../vendorModel');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'tickets', 'turnover', 'winloss', 'commission', 'totalWinloss', 'licenseeWinloss', 'providerWinloss'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            brand: {
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
            bets: {
                type: this.Datatypes.INTEGER
            },
            stake: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            stakeSold: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            takeBackAmount: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            memberComission: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand']
            }
        ];
        return super.setup();
    }
}

module.exports = CMD;