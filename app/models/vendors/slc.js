const Model = require('../vendorModel');

class SLC extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'betAmount', 'winloss'];
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
            currency: {
                type: this.Datatypes.STRING
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            comm: {
                type: this.Datatypes.INTEGER
            },
            commAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            totalAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            shareComm: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            totalShare: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            subTotal: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            vshareComm: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            vshareTotal: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            vsubTotal: {
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

module.exports = SLC;



