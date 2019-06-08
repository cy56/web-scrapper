const Model = require('../vendorModel');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'currency', 'players', 'bets', 'stake', 'stakeSold', 'takeBackAmount', 'memberComission', 'playerWinloss', 'winningPercent'];
        this.groupAttr = ['source', 'brand', 'currency', [sequelize.fn('sum', sequelize.col('players')), 'players'], 
        [sequelize.fn('sum', sequelize.col('bets')), 'bets'], [sequelize.fn('sum', sequelize.col('stake')), 'stake'], 
        [sequelize.fn('sum', sequelize.col('playerWinloss')), 'playerWinloss']];
        this.group = ['source', 'brand', 'currency'];
        this.structure = {
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
            players: {
                type: this.Datatypes.INTEGER
            },
            bets: {
                type: this.Datatypes.INTEGER
            },
            stake: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            stakeSold: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            takeBackAmount: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            memberComission: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
        return super.setup();
    }
}

module.exports = CMD;