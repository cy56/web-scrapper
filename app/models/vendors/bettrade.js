const Model = require('../vendorModel');

class BETTRADE extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'ticket', 'stake', 'buyBackAmount', 'clientComm', 'betWinloss', 'clientWinloss', 'memberWinloss'];
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
            ticket: {
                type: this.Datatypes.INTEGER
            },
            stake: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            buyBackAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            clientComm: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            betWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            clientWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            memberWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
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

module.exports = BETTRADE;