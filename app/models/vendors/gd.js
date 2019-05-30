const Model = require('../vendorModel');

class GD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'activePlayer', 'betCount', 'betAmount', 'validBetAmount', 'playerWinLoss'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            date: {
                type: this.Datatypes.DATEONLY
            },
            currency: {
                type: this.Datatypes.STRING
            },
            vendor: {
                type: this.Datatypes.STRING
            },
            filename: {
                type: this.Datatypes.STRING
            },
            provider: {
                type: this.Datatypes.STRING
            },
            activePlayer: {
                type: this.Datatypes.INTEGER
            },
            betCount: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            validBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            playerWinLoss: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source']
            },
            {
                name: 'source_date',
                fields: ['date', 'source']
            }
        ];
        return super.setup();
    }
}

module.exports = GD;