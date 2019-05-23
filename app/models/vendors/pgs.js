module.exports = (sequelize, Sequelize) => {
    const PGS = sequelize.define('pgs', {
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
        playerCT: {
            type: Sequelize.INTEGER
        },
        playerNew: {
            type: Sequelize.INTEGER
        },
        hands: {
            type: Sequelize.INTEGER
        },
        rounds: {
            type: Sequelize.INTEGER
        },
        stakes: {
            type: Sequelize.DECIMAL(24, 2)
        },
        playerWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        companyWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        jpContribution: {
            type: Sequelize.DECIMAL(24, 2)
        },
        jpWin: {
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

    return PGS;
}