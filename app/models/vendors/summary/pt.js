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
                fields: ['date', 'source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'brand', 'date', 'currency', 'players',
            'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins'
        ];
    }

    static getOnDuplicateValues() {
        return [ 'players', 'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins' ];
    }

    static getDatatableColumns() {
        return ['source', 'currency', 'date', 'players', 'bets', 'turnover', 'total_win', 'game_income_share', 'jp_wins'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Currency', value: 'currency', softable: true },
            { text: 'Date', value: 'date', softable: true },
            { text: 'Players (vendor)', value: 'vendor_players', align: 'start' },
            { text: 'Bets (vendor)', value: 'vendor_bets', align: 'start' },
            { text: 'Turnover (vendor)', value: 'vendor_turnover', align: 'start' },
            { text: 'Total Win (vendor)', value: 'vendor_total_win', align: 'start' },
            { text: 'Game Income Share (vendor)', value: 'vendor_game_income_share', align: 'start' },
            { text: 'Jackpot Wins (vendor)', value: 'vendor_jp_wins', align: 'start' },
            { text: 'Players (hydra)', value: 'hydra_players', align: 'start' },
            { text: 'Bets (hydra)', value: 'hydra_bets', align: 'start' },
            { text: 'Turnover (hydra)', value: 'hydra_turnover', align: 'start' },
            { text: 'Total Win (hydra)', value: 'hydra_total_win', align: 'start' },
            { text: 'Game Income Share (hydra)', value: 'hydra_game_income_share', align: 'start' },
            { text: 'Jackpot Wins (hydra)', value: 'hydra_jp_wins', align: 'start' },
            { text: 'Players (Diff)', value: 'diff_players', align: 'start' },
            { text: 'Bets (Diff)', value: 'diff_bets', align: 'start' },
            { text: 'Turnover (Diff)', value: 'diff_turnover', align: 'start' },
            { text: 'Total Win (Diff)', value: 'diff_total_win', align: 'start' },
            { text: 'Game Income Share (Diff)', value: 'diff_game_income_share', align: 'start' },
            { text: 'Jackpot Wins (Diff)', value: 'diff_jp_wins', align: 'start' }  
        ];
    }

    static getDataIndexes() {
        return ['currency', 'date'];
    }

    static getVendorParserColumns() {
        return [, 'players', 'bets', 'turnover', , , , 'total_win', 'game_income_share', , , , , , , , 'jp_wins'];
    }

    static getVendorParserSkipLines() {
        return [0];
    }

    static getHydraParserColumns() {
        return [, 'currency', 'players', 'bets', , 'turnover', 'total_win', 'game_income_share', , , , 'jp_wins'];
    }

    static getHydraParserSkipLines() {
        return [0, 2, 4];
    }

    static getParserCast() {
        return [
            { 'players': Number },
            { 'bets': 0 },
            { 'turnover': 4 },
            { 'total_win': 4 },
            { 'game_income_share': 4 },
            { 'jp_wins': 4 },
        ];
    }

    static getSkipDuplicate() {
        return ['currency', 'date'];
    }
}

module.exports = PT;