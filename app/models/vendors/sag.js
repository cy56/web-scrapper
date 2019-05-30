const Model = require('../vendorModel');

class SAG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'transactions', 'betAmount', 'winloss', 'rollAmount', 'subLobbyTotal'];
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
            transactions: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            winloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            rollAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            rollComm: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            subLobbyTotal: {
                type: this.Datatypes.DECIMAL(24, 2)
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

module.exports = SAG;