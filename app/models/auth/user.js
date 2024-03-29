const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize, Datatypes) {
        return super.init({
            firstname: {
                type: Datatypes.STRING
            },
            lastname: {
                type: Datatypes.STRING
            },
            email: {
                type: Datatypes.STRING,
                unique: true
            },
            password: {
                type: Datatypes.TEXT
            }
        }, { sequelize });
    }

    static async getUser(params = {}) {
        try {
            let attributes = ['id', 'firstname', 'lastname', 'email', 'password'];
            return await this.findOne({ where: params, attributes, raw:true });
        } catch(err) {
            console.error('user table: ', err.message);
        }
    }

    static async createUser(params = {}) {
        try {
            return await this.create(params, { raw: true });
        } catch(err) {
            console.error('user table: ', err.message);
        }
    }
}

module.exports = User;