const Model = require('../vendorModel');

class NLE extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'betAmount', 'profitLoss'];
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
            profitLoss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            holdPercent: {
                type: this.Datatypes.DECIMAL(24, 3)
            },
            uniquePlayer: {
                type: this.Datatypes.INTEGER
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

module.exports = NLE;



