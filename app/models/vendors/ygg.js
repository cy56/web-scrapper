module.exports = (sequelize, Sequelize) => {
    const YGG = sequelize.define('ygg', {
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
        type: {
            type: Sequelize.STRING
        },
        betCount: {
            type: Sequelize.INTEGER
        },
        userCount: {
            type: Sequelize.INTEGER
        },
        betAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        wonAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        rtp: {
            type: Sequelize.DECIMAL(24, 2)
        },
        profit: {
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

    return YGG;
}