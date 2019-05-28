const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/auth/user').init(sequelize, Sequelize);
// db.cmd = require('../models/vendors/cmd.js')(sequelize, Sequelize);
// db.gd = require('../models/vendors/gd.js')(sequelize, Sequelize);
// db.gen = require('../models/vendors/gen.js')(sequelize, Sequelize);
// db.pt = require('../models/vendors/pt.js')(sequelize, Sequelize);
// db.bsg = require('../models/vendors/bsg.js')(sequelize, Sequelize);
// db.mg = require('../models/vendors/mg.js')(sequelize, Sequelize);
// db.sbt = require('../models/vendors/sbt.js')(sequelize, Sequelize);
// db.tgp = require('../models/vendors/tgp.js')(sequelize, Sequelize);
// db.ygg = require('../models/vendors/ygg.js')(sequelize, Sequelize);

// db.ab = require('../models/vendors/ab.js')(sequelize, Sequelize);
// db.ag = require('../models/vendors/ag.js')(sequelize, Sequelize);
// db.bettrade = require('../models/vendors/bettrade.js')(sequelize, Sequelize);
// db.ipsb = require('../models/vendors/ipsb.js')(sequelize, Sequelize);
// db.nle = require('../models/vendors/nle.js')(sequelize, Sequelize);
// db.sag = require('../models/vendors/sag.js')(sequelize, Sequelize);
// db.slc = require('../models/vendors/slc.js')(sequelize, Sequelize);
// db.spg = require('../models/vendors/spg.js')(sequelize, Sequelize);

module.exports = db;