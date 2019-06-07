const Model = require('../vendorModel');

class AB extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'date', 'source', 'currency', 'players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
        this.groupAttr = ['source', 'currency', 'players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
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
                fields: ['date', 'source', 'brand', 'currency']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
        return super.setup();
    }
}

module.exports = AB;