const Model = require('../vendorModel');

class BSG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'betAmount', 'roundCount', 'totalPayout', 'winloss'];
        this.structure = {
            source: {
                type: this.Datatypes.STRING
            },
            date: {
                type: this.Datatypes.DATEONLY
            },
            type: {
                type: this.Datatypes.STRING
            },
            games: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            roundCount: {
                type: this.Datatypes.INTEGER
            },
            totalPayout: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
        this.indexes = [
            {
                unique: true,
                fields: ['date', 'source', 'type']
            },
            {
                name: 'source_date',
                fields: ['date', 'source']
            }
        ];
        return super.setup();
    }
}

module.exports = BSG;