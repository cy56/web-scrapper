const Model = require('../vendor');

class GD extends Model {
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
            date: {
                type: this.Datatypes.DATEONLY
            },
            filename: {
                type: this.Datatypes.STRING
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
            tipsAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpContribution: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpWins: {
                type: this.Datatypes.DECIMAL(24, 2)
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
                fields: ['date', 'source', 'brand', 'currency', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'date', 'currency', 'type', 'players', 'bets', 'turnover',
            'playerWinloss', 'winningPercent', 'tipsAmount', 'jpContribution', 'jpWins', 'playerWinlossJP'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'playerWinloss', 'winningPercent', 'tipsAmount', 'jpContribution', 'jpWins', 'playerWinlossJP'];
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
                [this.sequelize.fn('sum', this.sequelize.col('tipsAmount')), 'tipsAmount'],
                [this.sequelize.fn('sum', this.sequelize.col('jpContribution')), 'jpContribution'],
                [this.sequelize.fn('sum', this.sequelize.col('jpWins')), 'jpWins'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinlossJP')), 'playerWinlossJP']
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
            { text: 'Winning (%)', value: 'winningPercent' },
            { text: 'Tips Amount', value: 'tipsAmount' },
            { text: 'Jackpot Contribution', value: 'jpContribution' },
            { text: 'Jackpot Wins', value: 'jpWins' },
            { text: 'Player Winloss (inc. Jackpot)', value: 'playerWinlossJP' }
        ];
    }
}

module.exports = GD;