const Model = require('../vendor');

class AB extends Model {
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
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'source', 'brand', 'currency']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'date', 'source', 'currency', 'players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'],
                [this.sequelize.fn('sum', this.sequelize.col('winningPercent')), 'winningPercent']
            ],
            groupBy: ['source', 'brand', 'currency']
        }
    }

    static getDatatableFilter() {

    }

    static getDatatableHeader() {

    }
}

module.exports = AB;