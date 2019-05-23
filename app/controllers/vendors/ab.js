const db = require('../../config/db.js');
const model = db.ab;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'username', 'game', 'type', 'betAmount', 'winloss'];
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
        class: obj.class,
        username: obj.username,
        game: obj.game,
        betAmount: obj.betAmount,
        winloss: obj.winloss,
        validBetAmount: obj.validBetAmount,
        type: obj.type,
        rebate: obj.rebate,
        rebateAmount: obj.rebateAmount,
        netProfitLoss: obj.netProfitLoss,
        sharePercent: obj.sharePercent,
        shareBetAmount: obj.shareBetAmount,
        shareWinloss: obj.shareWinloss,
        shareValidBet: obj.shareValidBet,
        actualSettlement: obj.actualSettlement,
        shareWinPercent: obj.shareWinPercent
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};