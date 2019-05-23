//Database
const db = require('./app/config/db.js');
//Database sync
db.sequelize.sync().then(() => { console.log('Database was synced...') });