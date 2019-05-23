const db = require('../../config/db.js');
const model = db.pt;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'players', 'betAmount', 'totalWin', 'progressiveShare', 'progressiveWin'];
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
        players: obj.players,
        games: obj.games,
        betAmount: obj.betAmount,
        realBetAmount: obj.realBetAmount,
        realBetWin: obj.realBetWin,
        realMoneyPayout: obj.realMoneyPayout,
        totalWin: obj.totalWin,
        gameIncomeShare: obj.gameIncomeShare,
        gamePayout: obj.gamePayout,
        progressiveShare: obj.progressiveShare,
        progressiveWin: obj.progressiveWin
    }).then(() => { console.log('record was inserted') })
        .catch(err => { console.error('DB create failed:', err.message) });
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
        .then(() => { console.log('records were inserted') })
        .catch(err => { console.error('DB bulk create failed:', err.message) });
};