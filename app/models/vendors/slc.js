module.exports = (sequelize, Sequelize) => {
    const SLC = sequelize.define('slc', {
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
        winloss: {
            type: Sequelize.DECIMAL(24, 2)
        },
        comm: {
            type: Sequelize.INTEGER
        },
        commAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        totalAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        shareComm: {
            type: Sequelize.DECIMAL(24, 2)
        },
        totalShare: {
            type: Sequelize.DECIMAL(24, 2)
        },
        subTotal: {
            type: Sequelize.DECIMAL(24, 2)
        },
        vshareComm: {
            type: Sequelize.DECIMAL(24, 2)
        },
        vshareTotal: {
            type: Sequelize.DECIMAL(24, 2)
        },
        vsubTotal: {
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

    return SLC;
}