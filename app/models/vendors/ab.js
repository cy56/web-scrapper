module.exports = (sequelize, Sequelize) => {
    const AB = sequelize.define('ab', {
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
        class: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        game: {
            type: Sequelize.STRING
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        winloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        validBetAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        type: {
            type: Sequelize.STRING
        },
        rebate: {
            type: Sequelize.DECIMAL(24, 2)
        },
        rebateAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        netProfitLoss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        sharePercent: {
            type: Sequelize.DECIMAL(24, 2)
        },
        shareBetAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        shareWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        shareValidBet: {
            type: Sequelize.DECIMAL(24, 2)
        },
        actualSettlement: {
            type: Sequelize.DECIMAL(24, 2)
        },
        shareWinPercent: {
            type: Sequelize.DECIMAL(24, 7)
        }

    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['date', 'source']
                }
            ]
        });

    return AB;
}