const Model = require('../vendor');

class PT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.table = 'PT_Summary';
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
            players: {
                type: this.Datatypes.INTEGER
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
                fields: ['date', 'source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'brand', 'date', 'currency', 'players',
            'bets', 'turnover', 'totalWin', 'gameIncomeShare', 'jpWins'
        ];
    }

    static getOnDuplicateValues() {
        return [
            'players', 'bets', 'turnover', 'totalWin', 'gameIncomeShare', 'jpWins'
        ];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency', 'date'
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

    static getVendorParserColumns() {
        return [, 'players', 'bets', 'turnover', , , , 'totalWin', 'gameIncomeShare', , , , , , , , 'jpWins'];
    }

    static getHydraParserColumns() {
        return [];
    }

    static getParserCast() {
        return [
            { 'players': Number },
            { 'bets': Number },
            { 'turnover': 4 },
            { 'totalWin': 4 },
            { 'gameIncomeShare': 4 },
            { 'jpWins': 4 },
        ];
    }
}

module.exports = PT;