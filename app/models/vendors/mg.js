const Model = require('../vendorModel');

class MG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'type', 'players', 'bets', 
        'turnover', 'playerWinloss', 'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'];
        this.groupAttr = ['source', 'currency', 'type', 'players', 'bets',
            'turnover', 'playerWinloss', 'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'];
        this.group = ['source', 'brand', 'currency', 'type'];
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
            type: {
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
            },
            jpContribution: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpWins: {
                type: this.Datatypes.INTEGER
            },
            playerWinlossJP: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
        return super.setup();
    }
}

module.exports = MG;



