const Model = require('../vendorModel');

class GEN extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'brand', 'type', 'date', 'currency', 'players', 'bets', 'turnover', 
            'validTurnover', 'playerWinloss', 'jackpotWinloss', 'jackpotContribution', 'playerWinlossJP'];
        this.groupAttr = ['source', 'brand', 'type', 'currency', 'players', 'bets', 'turnover',
            'validTurnover', 'playerWinloss', 'jackpotWinloss', 'jackpotContribution', 'playerWinlossJP'];
        this.group = ['source', 'brand', 'currency', 'type'];
        this.structure = {
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
            bets : {
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
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'type']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency', 'type']
            }
        ];
        return super.setup();
    }
}

module.exports = GEN;