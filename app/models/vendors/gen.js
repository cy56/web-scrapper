module.exports = (sequelize, Sequelize) => {
    const GEN = sequelize.define('gen', {
        source: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        currency: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        vendor: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        },
        uap: {
            type: Sequelize.INTEGER
        },
        spin: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        winloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        rtp: {
            type: Sequelize.DECIMAL(24, 2)
        },
        uapSpin: {
            type: Sequelize.DECIMAL(24, 2)
        },
        uapBet: {
            type: Sequelize.DECIMAL(24, 2)
        },
        betSpin: {
            type: Sequelize.DECIMAL(24, 2)
        }
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['date', 'currency', 'source', 'type']
                },
                {
                    name: 'source_date',
                    fields: ['date', 'source']
                }
            ]
        });

    return GEN;
}