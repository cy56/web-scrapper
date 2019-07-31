const Model = require('../vendor');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.table = 'summary_cmd';
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
            bets: {
                type: this.Datatypes.INTEGER
            },
            stake: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            player_winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'date', 'currency', 'bets', 'stake', 'player_winloss'];
    }

    static getOnDuplicateValues() {
        return [
            'bets', 'stake', 'player_winloss'
        ];
    }

    static getDatatableColumns() {
        return ['source', 'currency', 'date', 'bets', 'stake', 'player_winloss'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Currency', value: 'currency', sortable: true, align: 'left', width: "1%" },
            { text: 'Date', value: 'date', sortable: true, align: 'left', width: "1%" },
            { text: '(vendor) Players', value: 'vendor_players', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Bets ', value: 'vendor_bets', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Stake', value: 'vendor_stake', align: 'left', sortable: false, width: "1%" },
            { text: '(vendor) Player WinLoss', value: 'vendor_player_winloss', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Players', value: 'hydra_players', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Bets', value: 'hydra_bets', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Stake', value: 'hydra_stake', align: 'left', sortable: false, width: "1%" },
            { text: '(hydra) Player WinLoss', value: 'hydra_player_winloss', align: 'left', sortable: false, width: "1%" },
            { text: '(Diff) Players', value: 'diff_players', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Bets', value: 'diff_bets', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Stake', value: 'diff_stake', align: 'left', sortable: true, width: "1%" },
            { text: '(Diff) Player WinLoss', value: 'diff_player_winloss', align: 'left', sortable: true, width: "1%" },
        ];
    }

    static getDataIndexes() {
        return ['currency', 'date'];
    }

    static getVendorMapperColumns() {
        return [, , 'currency', 'bets', 'stake', , 'player_winloss']
    }

    static getVendorMapperSkipLines() {
        return [0, 1, 2, 5, 6]
    }

    static getHydraMapperColumns() {
        
    }

    static getHydraMapperSkipLines() {

    }

    static getMapperCast() {
        return [
            { 'bets': 0 },
            { 'stake': 2 },
            { 'player_winloss': 2 }
        ];
    }

    static getSkipDuplicate() {
        return ['currency', 'date'];
    }
}

module.exports = CMD;