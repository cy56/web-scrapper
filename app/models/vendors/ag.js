const Model = require('../vendorModel');

class AG extends Model {
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
            validTurnover: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            grossWinAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpSettlement: {
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
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return [
            'id', 'source', 'date', 'currency', 'type', 'players', 'bets', 'turnover', 
            'validTurnover', 'grossWinAmount', 'jpSettlement'
        ];
    }

    static getOnDuplicateValues() {
        return [
            'players', 'bets', 'turnover', 'validTurnover', 'grossWinAmount', 'jpSettlement'
        ];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('validTurnover')), 'validTurnover'],
                [this.sequelize.fn('sum', this.sequelize.col('grossWinAmount')), 'grossWinAmount'],
                [this.sequelize.fn('sum', this.sequelize.col('jpSettlement')), 'jpSettlement']
            ],
            groupBy: ['source', 'brand', 'currency', 'type']
        }
    }

    static getDatatableFilter() {
        
    }

    static getDatatableHeader() {

    }
}

module.exports = AG;