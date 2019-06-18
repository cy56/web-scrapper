const Model = require('../vendorModel');

class GEN extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.groupAttr = ['source', 'type', 'currency', 'players', 'bets', 'turnover',
            'validTurnover', 'playerWinloss', 'jackpotWinloss', 'jackpotContribution', 'playerWinlossJP'];
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
            filename: {
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
                type: this.Datatypes.DECIMAL(24, 4)
            },
            validTurnover: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            jackpotWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            jackpotContribution: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinlossJP: {
                type: this.Datatypes.DECIMAL(24, 4)
            }
        };
    }

    static getModelIndex() { 
        return [
            {
                unique: true,
                fields: ['date', 'currency', 'brand', 'source', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'brand', 'type', 'date', 'currency', 'players', 'bets', 'turnover',
            'validTurnover', 'playerWinloss', 'jackpotWinloss', 'jackpotContribution', 'playerWinlossJP'];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'turnover', 'validTurnover', 'playerWinloss', 'jackpotWinloss', 'jackpotContribution', 'playerWinlossJP'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: ['source', 'currency', 'type', [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'], [this.sequelize.fn('sum', this.sequelize.col('turnover')), 'turnover'],
                [this.sequelize.fn('sum', this.sequelize.col('validTurnover')), 'validTurnover'], [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'],
                [this.sequelize.fn('sum', this.sequelize.col('jackpotWinloss')), 'jackpotWinloss'], [this.sequelize.fn('sum', this.sequelize.col('jackpotContribution')), 'jackpotContribution'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinlossJP')), 'playerWinlossJP']],
            groupBy: ['source', 'brand', 'currency', 'type']
        }
    }

}

module.exports = GEN;