const db = require('../../config/db.js');
const model = db.gd;

//API
exports.findByParams = (req, res) => {
    const wheres = req.body;
    const attributes = ['id', 'source', 'date', 'currency', 'activePlayer', 'betCount', 'betAmount', 'validBetAmount', 'playerWinLoss'];
    model.findAll({
    attributes: attributes,
    where : wheres
    }).then(model => { res.send(model)}).catch(err=>{ res.send(err)});
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
        provider: obj.provider,
        date: obj.date,
        currency: obj.currency,
        activePlayer: obj.activePlayer,
        betCount: obj.betCount,
        betAmount: obj.betAmount,
        validBetAmount: obj.validBetAmount,
        playerWinLoss: obj.playerWinLoss,
        filename: obj.filename 
    }).then(() => {console.log('record was inserted')})
    .catch(err => { console.error('DB create failed:', err.message)});
};

exports.bulkCreate = (obj) => {
    model.bulkCreate(obj)
    .then(() => { console.log('records were inserted') })
    .catch(err=>{console.error('DB bulk create failed:', err.message)});
};