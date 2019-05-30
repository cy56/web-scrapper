const Model = require('../vendorModel');

class MG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'sessionCasino', 'currency', 'players', 'games', 'wagers',
            'wagerAmount', 'payouts', 'payoutAmount', 'progressive', 'grossGameRevenue', 'grossMargin'];
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
            sessionCasino: {
                type: this.Datatypes.STRING
            },
            currency: {
                type: this.Datatypes.STRING
            },
            players: {
                type: this.Datatypes.INTEGER
            },
            games: {
                type: this.Datatypes.INTEGER
            },
            wagers: {
                type: this.Datatypes.INTEGER
            },
            wagerAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            payouts: {
                type: this.Datatypes.INTEGER
            },
            payoutAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            progressive: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            grossGameRevenue: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            grossMargin: {
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

module.exports = MG;



