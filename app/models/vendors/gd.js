module.exports = (sequelize, Sequelize) => {
    const GD = sequelize.define('gd', {
        source: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        currency: {
            type: Sequelize.STRING
        },
        vendor: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        },
        provider: {
            type: Sequelize.STRING
        },
        activePlayer: {
            type: Sequelize.INTEGER
        },
        betCount: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        validBetAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        playerWinLoss: {
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

    return GD;
}