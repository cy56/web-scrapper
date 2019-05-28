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
                type: Datatypes.STRING
            },
            password: {
                type: Datatypes.TEXT
            }
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                }
            ], sequelize 
        });
    }

    static async getUser(params = {}) {
        try {
            let attributes = ['id', 'firstname', 'lastname', 'email', 'password'];
            return await this.findOne({ where: params, attributes });
        } catch(err) {
            console.error('user table: ', err.message);
        }
    }

    static async createUser(params = {}) {
        try {
            return await this.create(params);
        } catch(err) {
            console.error('user table: ', err.message);
        }
    }
}

module.exports = User;