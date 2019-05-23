module.exports = (sequelize, Sequelize) => {
    const TGP = sequelize.define('tgp', {
        source: {
            type: Sequelize.STRING
        },
        vendor: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        currency: {
            type: Sequelize.STRING
        },
        players: {
            type: Sequelize.INTEGER
        },
        rounds: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        turnover: {
            type: Sequelize.DECIMAL(24, 2)
        },
        validBet: {
            type: Sequelize.DECIMAL(24, 2)
        },
        companyWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        commission: {
            type: Sequelize.DECIMAL(24, 2)
        },
        percentComWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        }
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['date', 'currency', 'source']
                },
                {
                    name: 'source_date',
                    fields: ['date', 'source']
                }
            ]
        });

    return TGP;
}