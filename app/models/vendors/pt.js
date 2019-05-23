module.exports = (sequelize, Sequelize) => {
    const PT = sequelize.define('pt', {
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
        players: {
            type: Sequelize.INTEGER
        },
        games: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 7)
        },
        realBetAmount: {
            type: Sequelize.DECIMAL(24, 7)
        },
        realBetWin: {
            type: Sequelize.DECIMAL(24, 7)
        },
        realMoneyPayout: {
            type: Sequelize.DECIMAL(24, 2)
        },
        totalWin: {
            type: Sequelize.DECIMAL(24, 7)
        },
        gameIncomeShare: {
            type: Sequelize.DECIMAL(24, 7)
        },
        gamePayout: {
            type: Sequelize.DECIMAL(24, 2)
        },
        progressiveShare: {
            type: Sequelize.DECIMAL(24, 7)
        },
        progressiveWin: {
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

    return PT;
}