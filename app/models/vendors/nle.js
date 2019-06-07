const Model = require('../vendorModel');

class NLE extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'bets', 'players', 'turnover', 'playerWinloss', 'winningPercent'];
        this.groupAttr = ['source', 'currency', 'bets', 'players', 'turnover', 'playerWinloss', 'winningPercent'];
        this.group = ['source', 'brand', 'currency'];
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
            bets: {
                type: this.Datatypes.INTEGER
            },
            players: {
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
                fields: ['date', 'currency', 'source', 'brand']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
        return super.setup();
    }
}

module.exports = NLE;



