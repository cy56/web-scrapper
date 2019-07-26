const Model = require('../vendor');

class CMD extends Model {
    static initial(sequelize, Datatypes) {
        this.sequelize = sequelize;
        this.Datatypes = Datatypes;
        this.table = 'player_cmd';
        return super.setup();
    }
}

module.exports = CMD;