module.exports = (sequelize, Sequelize) => {
    const CMD = sequelize.define('cmd', {
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
        tickets: {
            type: Sequelize.INTEGER
        },
        turnover: {
            type: Sequelize.DECIMAL(24, 2)
        },
        winloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        commission: {
            type: Sequelize.DECIMAL(24, 2)
        },
        totalWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        licenseeWinloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        providerWinloss: {
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

    return CMD;
}