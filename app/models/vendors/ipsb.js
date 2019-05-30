{
    source: {
        type: this.Datatypes.STRING
    },
    vendor: {
        type: this.Datatypes.STRING
    },
    filename: {
        type: this.Datatypes.STRING
    },
    date: {
        type: this.Datatypes.DATEONLY
    },
    currency: {
        type: this.Datatypes.STRING
    },
    buyBackTickets: {
        type: this.Datatypes.INTEGER
    },
    actualStake: {
        type: this.Datatypes.DECIMAL(24, 4)
    },
    buyBackAmount: {
        type: this.Datatypes.DECIMAL(24, 2)
    },
    clientComm: {
        type: this.Datatypes.DECIMAL(24, 4)
    },
    winloss: {
        type: this.Datatypes.DECIMAL(24, 4)
    },
    clientWinloss: {
        type: this.Datatypes.DECIMAL(24, 4)
    },
    grossWinloss: {
        type: this.Datatypes.DECIMAL(24, 4)
    },
    memberWinloss: {
        type: this.Datatypes.DECIMAL(24, 4)
    }
};

[
    {
        unique: true,
        fields: ['date', 'currency', 'source']
    },
    {
        name: 'source_date',
        fields: ['date', 'source']
    }
];