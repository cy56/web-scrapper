const db = require('../../config/db.js');
const model = db.ygg;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'type', 'betCount', 'userCount', 'betAmount', 'wonAmount', 'rtp', 'profit'];
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
        type: obj.type,
        betCount: obj.betCount,
        userCount: obj.userCount,
        currency: obj.currency,
        betAmount: obj.betAmount,
        wonAmount: obj.wonAmount,
        rtp: obj.rtp,
        profit: obj.profit
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};