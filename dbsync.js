//Database
const db = require('./app/services/database');
//Database sync
db.sequelize.sync().then(() => { console.log('Database was synced...') });