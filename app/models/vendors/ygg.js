const Model = require('../vendorModel');

class YGG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'type', 'betCount', 'userCount', 'betAmount', 'wonAmount', 'rtp', 'profit'];
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
            type: {
                type: this.Datatypes.STRING
            },
            betCount: {
                type: this.Datatypes.INTEGER
            },
            userCount: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            wonAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            rtp: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            profit: {
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

module.exports = YGG;