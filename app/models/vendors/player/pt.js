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

    static getDatatableColumns() {
        return ['source', 'currency', 'date', 'username', 'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Currency', value: 'currency', sortable: true, align: 'left', width: "1%" },
            { text: 'Date', value: 'date', sortable: true, align: 'left', width: "1%" },
            { text: 'Username', value: 'username', align: 'left', sortable: true, width: "1%" },
            { text: '(vendor) Bets ', value: 'vendor_bets', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Turnover', value: 'vendor_turnover', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Total Win', value: 'vendor_total_win', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Game Income Share', value: 'vendor_game_income_share', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Jackpot Wins', value: 'vendor_jp_wins', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Bets', value: 'hydra_bets', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Turnover', value: 'hydra_turnover', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Total Win', value: 'hydra_total_win', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Game Income Share', value: 'hydra_game_income_share', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Jackpot Wins', value: 'hydra_jp_wins', align: 'left', sortable: false, width: "1%" },
            { text: '(Diff) Bets', value: 'diff_bets', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Turnover', value: 'diff_turnover', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Total Win', value: 'diff_total_win', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Game Income Share', value: 'diff_game_income_share', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Jackpot Wins', value: 'diff_jp_wins', align: 'left', sortable: true, width: "1%" }
        ];
    }

    static getDataIndexes() {
        return ['currency', 'date', 'username'];
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