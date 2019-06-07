const Model = require('../vendorModel');

class PT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'brand', 'date', 'currency', 'players',
            'bets', 'type', 'turnover', 'totalWin', 'gameIncomeShare', 'playerWinloss',
            'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'
        ];
        this.groupAttr = ['source', 'currency', 'players', 'bets', 'type', 'turnover', 'totalWin', 
            'gameIncomeShare', 'playerWinloss','winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'];
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
            players: {
                type: this.Datatypes.INTEGER
            },
            bets: {
                type: this.Datatypes.INTEGER
            },
            type: {
                type: this.Datatypes.STRING
            },
            turnover: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            totalWin: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            gameIncomeShare: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpContribution: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            jpWins: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            playerWinlossJP: {
                type: this.Datatypes.DECIMAL(24, 7)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'source', 'brand', 'currency', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
        return super.setup();
    }
}

module.exports = PT;