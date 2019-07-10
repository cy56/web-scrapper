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
                'source', 'currency', 'date', 'username',
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('total_win')), 'totalWin'],
                [this.sequelize.fn('sum', this.sequelize.col('game_income_share')), 'gameIncomeShare'],
                [this.sequelize.fn('sum', this.sequelize.col('jp_wins')), 'jpWins']
            ],
            groupBy: ['date', 'source', 'brand', 'currency', 'username']
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
        return ['currency', 'username'];
    }

    static getVendorParserColumns() {
        return ['username', , , , 'bets', 'turnover', , , , 'totalWin', 'gameIncomeShare', , , , , , , , 'jpWins'];
    }

    static getVendorParserSkipLines() {
        return [0, -1];
    }

    static getHydraParserColumns() {
        return [, , 'username', 'currency', 'bets', , 'turnover', 'totalWin', 'gameIncomeShare', , , , 'jpWins'];
    }

    static getHydraParserSkipLines() {
        return [0, -1];
    }

    static getParserCast() {
        return [
            { 'bets': Number },
            { 'turnover': 4 },
            { 'totalWin': 4 },
            { 'gameIncomeShare': 4 },
            { 'jpWins': 4 },
        ];
    }

    static getSkipDuplicate() {
        return ['currency', 'date', 'username'];
    }
}

module.exports = PT;