const db = require('../../config/db.js');
const model = db.mg;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'sessionCasino', 'currency', 'players', 'games', 'wagers', 
    'wagerAmount', 'payouts', 'payoutAmount', 'progressive', 'grossGameRevenue', 'grossMargin'];
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
        sessionCasino: obj.sessionCasino,
        currency: obj.currency,
        players: obj.players,
        games: obj.games,
        wagers: obj.wagers,
        wagerAmount: obj.wagerAmount,
        payouts: obj.payouts,
        payoutAmount: obj.payoutAmount,
        progressive: obj.progressive,
        grossGameRevenue: obj.grossGameRevenue,
        grossMargin: obj.grossMargin
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};