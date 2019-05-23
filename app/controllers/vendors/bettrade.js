const db = require('../../config/db.js');
const model = db.ipsb;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'buyBackTickets', 'actualStake', 'buyBackAmount', 'winloss', 'clientWinloss'];
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
        buyBackTickets: obj.buyBackTickets,
        actualStake: obj.actualStake,
        buyBackAmount: obj.buyBackAmount,
        clientComm: obj.clientComm,
        winloss: obj.winloss,
        clientWinloss: obj.clientWinloss,
        grossWinloss: obj.grossWinloss,
        memberWinloss: obj.memberWinloss
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};