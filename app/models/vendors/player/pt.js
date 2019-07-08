const Model = require('../vendor');

class PT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.table = 'PT_Player';
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
            currency: {
                type: this.Datatypes.STRING
            },
            username: {
                type: this.Datatypes.STRING
            },
            bets: {
                type: this.Datatypes.INTEGER
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
            jpWins: {
                type: this.Datatypes.DECIMAL(24, 4)
            }
        };
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'source', 'brand', 'currency', 'username']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'brand', 'date', 'currency', 'username',
            'bets', 'turnover', 'totalWin', 'gameIncomeShare', 'jpWins'
        ];
    }

    static getOnDuplicateValues() {
        return [
            'bets', 'turnover', 'totalWin', 'gameIncomeShare', 'jpWins'
        ];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency', 'date', 'username'
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('totalWin')), 'totalWin'],
                [this.sequelize.fn('sum', this.sequelize.col('gameIncomeShare')), 'gameIncomeShare'],
                [this.sequelize.fn('sum', this.sequelize.col('jpWins')), 'jpWins']
            ],
            groupBy: ['date', 'source', 'brand', 'currency']
        }
    }

    static getDatatableFilter() {
        return ['source', 'currency', 'date'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Source', value: 'source' },
            { text: 'Date', value: 'date' },
            { text: 'Currency', value: 'currency' },
            { text: 'No of Players', value: 'players' },
            { text: 'No of Bets', value: 'bets' },
            { text: 'Turnover', value: 'turnover' },
            { text: 'Total Win', value: 'totalWin' },
            { text: 'Game Income Share', value: 'gameIncomeShare' },
            { text: 'Jackpot Wins', value: 'jpWins' }
        ];
    }

    static getDataIndexes() {
        return ['currency', 'date'];
    }
}

module.exports = PT;