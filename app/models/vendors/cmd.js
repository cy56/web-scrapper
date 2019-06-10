const Model = require('../vendorModel');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        return super.setup();
    }

    static getModelStructure() {
        return {
            source: {
                type: this.Datatypes.STRING
            },
            brand: {
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
            players: {
                type: this.Datatypes.INTEGER
            },
            bets: {
                type: this.Datatypes.INTEGER
            },
            stake: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            stakeSold: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            takeBackAmount: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            memberComission: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 4)
            },
            winningPercent: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'currency', 'source', 'brand']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return ['id', 'source', 'currency', 'players', 'bets', 'stake', 'stakeSold', 'takeBackAmount', 'memberComission', 'playerWinloss', 'winningPercent'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: ['source', 'currency', [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'], [this.sequelize.fn('sum', this.sequelize.col('stake')), 'stake'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss']],
            groupBy: ['source', 'brand', 'currency']
        }
    }

    static getDatatableFilter() {
        return ['source', 'currency'];
    }

    static getDatatableHeader() {
        return [
            { text: 'Source', value: 'source' },
            { text: 'Currency', value: 'currency' },
            { text: 'No of Players', value: 'players' },
            { text: 'No of Bets', value: 'bets' },
            { text: 'Stake Amount', value: 'stake' },
            { text: 'Winloss Amount', value: 'playerWinloss' },
        ];
    }
}

module.exports = CMD;