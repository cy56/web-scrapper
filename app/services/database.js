const env = require('./configs/dbconfig');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

let summary = {};
let player = {};

db.summary = {
    pt: require('../models/vendors/summary/pt.js').initial(sequelize, Sequelize),
};
db.player = {
    pt: require('../models/vendors/player/pt.js').initial(sequelize, Sequelize),
};

//Models/tables
db.user = require('../models/auth/user').init(sequelize, Sequelize);
// db.cmd = require('../models/vendors/summary/cmd.js').initial(sequelize, Sequelize);
// db.gen = require('../models/vendors/summary/gen.js').initial(sequelize, Sequelize);
// db.bsg = require('../models/vendors/summary/bsg.js').initial(sequelize, Sequelize);
// db.pgs = require('../models/vendors/summary/pgs.js').initial(sequelize, Sequelize);
// db.mg = require('../models/vendors/summary/mg.js').initial(sequelize, Sequelize);
// db.tgp = require('../models/vendors/summary/tgp.js').initial(sequelize, Sequelize);
// db.ygg = require('../models/vendors/summary/ygg.js').initial(sequelize, Sequelize);
// db.gd = require('../models/vendors/summary/gd.js').initial(sequelize, Sequelize);
// db.sbt = require('../models/vendors/summary/sbt.js').initial(sequelize, Sequelize);
// db.agl = require('../models/vendors/summary/agl.js').initial(sequelize, Sequelize);
// db.ag = require('../models/vendors/summary/ag.js').initial(sequelize, Sequelize);

// db.ab = require('../models/vendors/summary/ab.js').initial(sequelize, Sequelize);
// db.bettrade = require('../models/vendors/summary/bettrade.js').initial(sequelize, Sequelize);
// db.ipsb = require('../models/vendors/summary/ipsb.js').initial(sequelize, Sequelize);
// db.nle = require('../models/vendors/nle.js')(sequelize, Sequelize);
// db.sag = require('../models/vendors/sag.js')(sequelize, Sequelize);
// db.slc = require('../models/vendors/slc.js')(sequelize, Sequelize);
// db.spg = require('../models/vendors/spg.js')(sequelize, Sequelize);

module.exports = db;