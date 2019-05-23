const db = require('../../config/db.js');
const model = db.gen;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'spin', 'betAmount', 'winloss'];
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
        date: obj.date,
        filename: obj.filename,
        currency: obj.currency,
        type: obj.type,
        uap: obj.uap,
        spin: obj.spin,
        betAmount: obj.betAmount,
        winloss: obj.winloss,
        rtp: obj.rtp,
        uapSpin: obj.uapSpin,
        uapBet: obj.uapBet,
        betSpin: obj.betSpin
    }).then(() => { console.log('record was inserted') })
    .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
    .then(() => { console.log('records were inserted') })
    .catch(err => { console.error('DB bulk create failed:', err.message) });
};