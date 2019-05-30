const Model = require('../vendorModel');

class GEN extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'spin', 'betAmount', 'winloss'];
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
            type: {
                type: this.Datatypes.STRING
            },
            vendor: {
                type: this.Datatypes.STRING
            },
            filename: {
                type: this.Datatypes.STRING
            },
            uap: {
                type: this.Datatypes.INTEGER
            },
            spin: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            rtp: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            uapSpin: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            uapBet: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            betSpin: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'type']
            },
            {
                name: 'source_date',
                fields: ['date', 'source']
            }
        ];
        return super.setup();
    }
}

module.exports = GEN;