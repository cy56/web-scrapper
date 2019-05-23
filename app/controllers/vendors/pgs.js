const db = require('../../config/db.js');
const model = db.pgs;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'playerCT', 'rounds', 'stakes', 'playerWinloss', 'jpContribution', 'jpWin'];
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
        playerCT: obj.playerCT,
        playerNew: obj.playerNew,
        hands: obj.hands,
        rounds: obj.rounds,
        stakes: obj.stakes,
        playerWinloss: obj.playerWinloss,
        companyWinloss: obj.companyWinloss,
        jpContribution: obj.jpContribution,
        jpWin: obj.jpWin
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};