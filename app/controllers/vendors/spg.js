const db = require('../../config/db.js');
const model = db.spg;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'betAmount', 'playerWinloss', 'jpContribute', 'jpWin'];
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
        bets: obj.bets,
        betAmount: obj.betAmount,
        validBetAmount: obj.validBetAmount,
        jpContribute: obj.jpContribute,
        playerWinloss: obj.playerWinloss,
        profit: obj.profit,
        jpWin: obj.jpWin,
        totalIncomeShare: obj.totalIncomeShare,
        mvalidBetAmount: obj.mvalidBetAmount,
        mjpContribute: obj.mjpContribute,
        mplayerWinloss: obj.mplayerWinloss,
        mjpWin: obj.mjpWin,
        mtotalIncomeShare: obj.mtotalIncomeShare
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};