const Model = require('../vendorModel');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'tickets', 'turnover', 'winloss', 'commission', 'totalWinloss', 'licenseeWinloss', 'providerWinloss'];
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
            tickets: {
                type: this.Datatypes.INTEGER
            },
            turnover: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            commission: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            totalWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            licenseeWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            providerWinloss: {
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

module.exports = CMD;