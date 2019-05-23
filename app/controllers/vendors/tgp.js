const db = require('../../config/db.js');
const model = db.tgp;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'players', 'rounds', 'betAmount', 'turnover', 'companyWinloss', 'commission'];
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
        players: obj.players,
        rounds: obj.rounds,
        betAmount: obj.betAmount,
        turnover: obj.turnover,
        validBet: obj.validBet,
        companyWinloss: obj.companyWinloss,
        commission: obj.commission,
        percentComWinloss: obj.percentComWinloss
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};