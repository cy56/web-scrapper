const Model = require('../vendorModel');

class SBT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'bets', 'turnover', 'ggr'];
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
            bets: {
                type: this.Datatypes.INTEGER
            },
            turnover: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            avgBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            ggr: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            margin: {
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

module.exports = SBT;