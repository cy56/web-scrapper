const Model = require('../vendor');

class BETTRADE extends Model {
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
            actualStake: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            bbAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            betWinloss: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            commission: {
                type: this.Datatypes.DECIMAL(24, 2)
            },
            settlementAmount: {
                type: this.Datatypes.DECIMAL(24, 2)
            }
        };
    }

    static getModelIndex() {
        return [
            {
                unique: true,
                fields: ['date', 'source', 'brand', 'currency']
            },
            {
                name: 'default_indexes',
                fields: ['source', 'brand', 'currency']
            }
        ];
    }

    static getModelDefaultAttributes() {
        return [
            'id', 'source', 'date', 'currency', 'type', 'players', 'bets', 'stake',
            'actualStake', 'bbAmount', 'betWinloss', 'commission', 'settlementAmount'
        ];
    }

    static getOnDuplicateValues() {
        return ['players', 'bets', 'stake', 'actualStake', 'bbAmount', 'betWinloss', 'commission', 'settlementAmount'];
    }

    static getDatatableGroupBy() {
        return {
            attributes: [
                'source', 'currency',
                [this.sequelize.fn('sum', this.sequelize.col('players')), 'players'],
                [this.sequelize.fn('sum', this.sequelize.col('bets')), 'bets'],
                [this.sequelize.fn('sum', this.sequelize.col('stake')), 'stake'],
                [this.sequelize.fn('sum', this.sequelize.col('actualStake')), 'actualStake'],
                [this.sequelize.fn('sum', this.sequelize.col('bbAmount')), 'bbAmount'],
                [this.sequelize.fn('sum', this.sequelize.col('betWinloss')), 'betWinloss'],
                [this.sequelize.fn('sum', this.sequelize.col('commission')), 'commission'],
                [this.sequelize.fn('sum', this.sequelize.col('settlementAmount')), 'settlementAmount']
            ],
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
            { text: 'No of BuyBack Bets', value: 'bets' },
            { text: 'Stake', value: 'stake' },
            { text: 'Actual Stake', value: 'actualStake' },
            { text: 'BuyBack Amount', value: 'bbAmount' },
            { text: 'Bet Win/Loss', value: 'betWinloss' },
            { text: 'Commission', value: 'commission' },
            { text: 'Settlement Amount', value: 'settlementAmount' },
        ];
    }
}

module.exports = BETTRADE;