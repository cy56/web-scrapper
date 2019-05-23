module.exports = (sequelize, Sequelize) => {
    const SPG = sequelize.define('tgp', {
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
        bets: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        validBetAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        jpContribute: {
            type: Sequelize.DECIMAL(24, 2)
        },
        playerWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        profit: {
            type: Sequelize.DECIMAL(24, 2)
        },
        jpWin: {
            type: Sequelize.DECIMAL(24, 2)
        },
        totalIncomeShare: {
            type: Sequelize.DECIMAL(24, 2)
        },
        mvalidBetAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        mjpContribute: {
            type: Sequelize.DECIMAL(24, 2)
        },
        mplayerWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        mjpWin: {
            type: Sequelize.DECIMAL(24, 2)
        },
        mtotalIncomeShare: {
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

    return SPG;
}