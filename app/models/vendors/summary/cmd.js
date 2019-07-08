const Model = require('../vendor');

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
                type: this.Datatypes.DECIMAL(24, 2)
            },
            stakeSold: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            takeBackAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            memberComission: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            playerWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
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
        return ['id', 'source', 'date', 'currency', 'players', 'bets', 'stake', 'stakeSold', 'takeBackAmount', 'memberComission', 'playerWinloss', 'winningPercent'];
    }

    static getOnDuplicateValues() {
        return [
            'players', 'bets', 'stake', 'stakeSold', 'takeBackAmount', 'memberComission', 'playerWinloss', 'winningPercent'
        ];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency', 'date',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'], 
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'], 
                [this.sequelize.fn('sum', this.sequelize.col('stake')), 'stake'], 
                [this.sequelize.fn('sum', this.sequelize.col('stakeSold')), 'stakeSold'], 
                [this.sequelize.fn('sum', this.sequelize.col('takeBackAmount')), 'takeBackAmount'], 
                [this.sequelize.fn('sum', this.sequelize.col('memberComission')), 'memberComission'],
                [this.sequelize.fn('sum', this.sequelize.col('playerWinloss')), 'playerWinloss'], 
                [this.sequelize.fn('sum', this.sequelize.col('winningPercent')), 'winningPercent']
            ],
            groupBy: ['source', 'brand', 'currency', 'date']
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