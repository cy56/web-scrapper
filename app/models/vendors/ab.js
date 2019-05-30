const Model = require('../vendorModel');

class AB extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'username', 'game', 'type', 'betAmount', 'winloss'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            vendor: {
                type: this.Datatypes.STRING
            },
            filename: {
                type: this.Datatypes.STRING
            },
            date: {
                type: this.Datatypes.DATEONLY
            },
            class: {
                type: this.Datatypes.STRING
            },
            username: {
                type: this.Datatypes.STRING
            },
            game: {
                type: this.Datatypes.STRING
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            validBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            type: {
                type: this.Datatypes.STRING
            },
            rebate: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            rebateAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            netProfitLoss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            sharePercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            shareBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            shareWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            shareValidBet: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            actualSettlement: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            shareWinPercent: {
                type: this.Datatypes.DECIMAL(24, 7)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'source']
            }
        ];
        return super.setup();
    }
}

module.exports = AB;