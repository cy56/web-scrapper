const Model = require('../vendor');

class SPG extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'currency', 'betAmount', 'playerWinloss', 'jpContribute', 'jpWin'];
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
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            validBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpContribute: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            profit: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            jpWin: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            totalIncomeShare: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            mvalidBetAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            mjpContribute: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            mplayerWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            mjpWin: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            mtotalIncomeShare: {
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

module.exports = SPG;



