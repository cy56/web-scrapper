module.exports = (sequelize, Sequelize) => {
    const MG = sequelize.define('mg', {
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
        sessionCasino: {
            type: Sequelize.STRING
        },
        currency: {
            type: Sequelize.STRING
        },
        players: {
            type: Sequelize.INTEGER
        },
        games: {
            type: Sequelize.INTEGER
        },
        wagers: {
            type: Sequelize.INTEGER
        },
        wagerAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        payouts: {
            type: Sequelize.INTEGER
        },
        payoutAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        progressive: {
            type: Sequelize.DECIMAL(24, 2)
        },
        grossGameRevenue: {
            type: Sequelize.DECIMAL(24, 2)
        },
        grossMargin: {
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

    return MG;
}