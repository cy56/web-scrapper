const Model = require('../vendorModel');

class PGS extends Model {
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
            jpContribution: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpWin: {
                type: this.Datatypes.INTEGER
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
                fields: ['date', 'currency', 'source', 'brand']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'date', 'currency', 'players', 'bets', 'turnover', 'playerWinloss', 'jpContribution', 'jpWin', 'winningPercent'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'playerWinloss', 'jpContribution', 'jpWin', 'winningPercent'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'],
                [this.sequelize.fn('sum', this.sequelize.col('jpContribution')), 'jpContribution'],
                [this.sequelize.fn('sum', this.sequelize.col('jpWin')), 'jpWin'],
                [this.sequelize.fn('sum', this.sequelize.col('winningPercent')), 'winningPercent']
            ],
            groupBy: ['source', 'brand', 'currency']
        }
    }

    static getDatatableFilter() {
        return ['source', 'currency'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Source', value: 'source' },
            { text: 'Currency', value: 'currency' },
            { text: 'No of Players', value: 'players' },
            { text: 'No of Bets', value: 'bets' },
            { text: 'Turnover', value: 'turnover' },
            { text: 'Player Winloss (exc. Jackpot)', value: 'playerWinloss' },
            { text: 'Jackpot Contribution', value: 'jpContribution' },
            { text: 'Jackpot Wins', value: 'jpWins' },
            { text: 'Winning (%)', value: 'winningPercent' }
        ];
    }
}

module.exports = PGS;



