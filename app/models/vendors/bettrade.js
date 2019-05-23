module.exports = (sequelize, Sequelize) => {
    const IPSB = sequelize.define('ipsb', {
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
        buyBackTickets: {
            type: Sequelize.INTEGER
        },
        actualStake: {
            type: Sequelize.DECIMAL(24, 4)
        },
        buyBackAmount: {
            type: Sequelize.DECIMAL(24, 2)
        },
        clientComm: {
            type: Sequelize.DECIMAL(24, 4)
        },
        winloss: {
            type: Sequelize.DECIMAL(24, 4)
        },
        clientWinloss: {
            type: Sequelize.DECIMAL(24, 4)
        },
        grossWinloss: {
            type: Sequelize.DECIMAL(24, 4)
        },
        memberWinloss: {
            type: Sequelize.DECIMAL(24, 4)
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

    return IPSB;
}