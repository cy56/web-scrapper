const db = require('../../config/db.js');
const model = db.cmd;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'tickets', 'turnover', 'winloss', 'commission', 'totalWinloss', 'licenseeWinloss', 'providerWinloss'];
    model.findAll({
        attributes: attributes,
        where: wheres
    }).then(model => { res.send(model) }).catch(err => { res.send(err) });
};

exports.findById = (req, res) => {
    model.findById(req.params.id).then(model => {
        res.send(model);
    })
};

//NONE API
exports.create = (obj) => {
    model.create({
        source: obj.source,
        vendor: obj.vendor,
        filename: obj.filename,
        date: obj.date,
        currency: obj.currency,
        tickets: obj.tickets,
        turnover: obj.turnover,
        winloss: obj.winloss,
        commission: obj.commission,
        totalWinloss: obj.totalWinloss,
        licenseeWinloss: obj.licenseeWinloss,
        providerWinloss: obj.providerWinloss
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};