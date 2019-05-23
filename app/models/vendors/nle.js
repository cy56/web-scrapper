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
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        profitLoss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        holdPercent: {
            type: Sequelize.DECIMAL(24, 3)
        },
        uniquePlayer: {
            type: Sequelize.INTEGER
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