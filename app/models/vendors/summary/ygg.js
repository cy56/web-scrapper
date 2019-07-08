const Model = require('../vendor');

class YGG extends Model {
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
                name: 'source_date',
                fields: ['date', 'source', 'brand', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'date', 'currency', 'type', 'players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'playerWinloss', 'winningPercent'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency', 'type',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'],
                [this.sequelize.fn('sum', this.sequelize.col('winningPercent')), 'winningPercent'],
            ],
            groupBy: ['source', 'brand', 'currency', 'type']
        }
    }

    static getDatatableFilter() {
        return ['source', 'currency', 'type'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Source', value: 'source' },
            { text: 'Currency', value: 'currency' },
            { text: 'Game Type', value: 'type' },
            { text: 'No of Players', value: 'players' },
            { text: 'No of Bets', value: 'bets' },
            { text: 'Turnover', value: 'turnover' },
            { text: 'Player Winloss (exc. Jackpot)', value: 'playerWinloss' },
            { text: 'Winning (%)', value: 'winningPercent' }
        ];
    }
}

module.exports = YGG;