module.exports = (sequelize, Sequelize) => {
    const BSG = sequelize.define('bsg', {
        source: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        type: {
            type: Sequelize.STRING
        },
        games: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        roundCount: {
            type: Sequelize.INTEGER
        },
        totalPayout: {
            type: Sequelize.DECIMAL(24, 2)
        },
        winloss: {
            type: Sequelize.DECIMAL(24, 2)
        }
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['date', 'source', 'type']
                },
                {
                    name: 'source_date',
                    fields: ['date', 'source']
                }
            ]
        });

    return BSG;
}