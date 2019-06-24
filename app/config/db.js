const env = require('./env.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },
    operatorsAliases: operatorsAliases
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/auth/user').init(sequelize, Sequelize);
db.cmd = require('../models/vendors/cmd.js').initial(sequelize, Sequelize);
db.pt = require('../models/vendors/pt.js').initial(sequelize, Sequelize);
db.gen = require('../models/vendors/gen.js').initial(sequelize, Sequelize);
db.bsg = require('../models/vendors/bsg.js').initial(sequelize, Sequelize);
db.pgs = require('../models/vendors/pgs.js').initial(sequelize, Sequelize);
db.mg = require('../models/vendors/mg.js').initial(sequelize, Sequelize);
db.tgp = require('../models/vendors/tgp.js').initial(sequelize, Sequelize);
db.ygg = require('../models/vendors/ygg.js').initial(sequelize, Sequelize);
db.gd = require('../models/vendors/gd.js').initial(sequelize, Sequelize);
db.sbt = require('../models/vendors/sbt.js').initial(sequelize, Sequelize);
db.agl = require('../models/vendors/agl.js').initial(sequelize, Sequelize);
db.ag = require('../models/vendors/ag.js').initial(sequelize, Sequelize);

// db.ab = require('../models/vendors/ab.js')(sequelize, Sequelize);
// db.bettrade = require('../models/vendors/bettrade.js')(sequelize, Sequelize);
// db.ipsb = require('../models/vendors/ipsb.js')(sequelize, Sequelize);
// db.nle = require('../models/vendors/nle.js')(sequelize, Sequelize);
// db.sag = require('../models/vendors/sag.js')(sequelize, Sequelize);
// db.slc = require('../models/vendors/slc.js')(sequelize, Sequelize);
// db.spg = require('../models/vendors/spg.js')(sequelize, Sequelize);

module.exports = db;