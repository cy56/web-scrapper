const Model = require('../vendorModel');

class PT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        return super.setup();
    }

    static getModelStructure() {
        return {
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
                type: this.Datatypes.DECIMAL(24, 4)
            },
            totalWin: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            gameIncomeShare: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpContribution: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            jpWins: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinlossJP: {
                type: this.Datatypes.DECIMAL(24, 4)
            }
        };
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'source', 'brand', 'currency', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'brand', 'date', 'currency', 'players',
            'bets', 'type', 'turnover', 'totalWin', 'gameIncomeShare', 'playerWinloss',
            'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'
        ];
    }

    static getOnDuplicateValues() {
        return [
            'players', 'bets', 'turnover', 'totalWin', 'gameIncomeShare', 'playerWinloss',
            'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'
        ];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency', 'type', 
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'], 
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'], 
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'], 
                [this.sequelize.fn('sum', this.sequelize.col('totalWin')), 'totalWin'], 
                [this.sequelize.fn('sum', this.sequelize.col('gameIncomeShare')), 'gameIncomeShare'], 
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'], 
                [this.sequelize.fn('sum', this.sequelize.col('winningPercent')), 'winningPercent'], 
                [this.sequelize.fn('sum', this.sequelize.col('jpContribution')), 'jpContribution'], 
                [this.sequelize.fn('sum', this.sequelize.col('jpWins')), 'jpWins'], 
                [this.sequelize.fn('sum', this.sequelize.col('playerWinlossJP')), 'playerWinlossJP']
            ],
            groupBy: ['source', 'brand', 'currency', 'type']
        }
    }

    static getDatatableFilter() {
        
    }

    static getDatatableHeader() {

    }
}

module.exports = PT;