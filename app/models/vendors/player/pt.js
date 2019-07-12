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
            total_win: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            game_income_share: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            jp_wins: {
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
            'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins'
        ];
    }

    static getOnDuplicateValues() {
        return [
            'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins'
        ];
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
            { text: 'Total Win', value: 'total_win' },
            { text: 'Game Income Share', value: 'game_income_share' },
            { text: 'Jackpot Wins', value: 'jp_wins' }
        ];
    }

    static getDataIndexes() {
        return ['currency', 'username'];
    }

    static getVendorParserColumns() {
        return ['username', , , , 'bets', 'turnover', , , , 'total_win', 'game_income_share', , , , , , , , 'jp_wins'];
    }

    static getVendorParserSkipLines() {
        return [0, -1];
    }

    static getHydraParserColumns() {
        return [, , 'username', 'currency', 'bets', , 'turnover', 'total_win', 'game_income_share', , , , 'jp_wins'];
    }

    static getHydraParserSkipLines() {
        return [0, -1];
    }

    static getParserCast() {
        return [
            { 'bets': Number },
            { 'turnover': 4 },
            { 'total_win': 4 },
            { 'game_income_share': 4 },
            { 'jp_wins': 4 },
        ];
    }

    static getSkipDuplicate() {
        return ['currency', 'date', 'username'];
    }
}

module.exports = PT;