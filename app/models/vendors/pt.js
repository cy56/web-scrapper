const Model = require('../vendorModel');

class PT extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.attributes = ['id', 'source', 'date', 'players', 'betAmount', 'totalWin', 'progressiveShare', 'progressiveWin'];
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
            players: {
                type: this.Datatypes.INTEGER
            },
            games: {
                type: this.Datatypes.INTEGER
            },
            betAmount: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            realBetAmount: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            realBetWin: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            realMoneyPayout: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            totalWin: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            gameIncomeShare: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            gamePayout: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            progressiveShare: {
                type: this.Datatypes.DECIMAL(24, 7)
            },
            progressiveWin: {
                type: this.Datatypes.DECIMAL(24, 7)
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

module.exports = PT;