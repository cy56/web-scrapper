const Model = require('../vendorModel');

class MG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.groupAttr = ['source', 'currency', 'type', 'players', 'bets',
            'turnover', 'playerWinloss', 'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'];
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
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'date', 'currency', 'type', 'players', 'bets',
            'turnover', 'playerWinloss', 'winningPercent', 'jpContribution', 'jpWins', 'playerWinlossJP'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'playerWinloss', 'winningPercent', 
            'jpContribution', 'jpWins', 'playerWinlossJP'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
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

module.exports = MG;



