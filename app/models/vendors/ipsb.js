const Model = require('../vendorModel');

class IPSB extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'bets', 'players', 'turnover', 'playerWinloss', 'winningPercent'];
        this.groupAttr = ['source', 'currency', 'bets', 'players', 'turnover', 'playerWinloss', 'winningPercent'];
        this.group = ['source', 'currency'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            brand: {
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
            turnover: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'currency']
            }
        ];
        return super.setup();
    }
}

module.exports = IPSB;