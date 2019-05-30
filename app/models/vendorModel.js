const Sequelize = require('sequelize');

class VendorModel extends Sequelize.Model {
    static setup() {
        return super.init(this.structure, { indexes: this.indexes, sequelize: this.sequelize });
    }

    static async findByParams(params = {}) {
        try {
            const wheres = params.body || params;
            return await this.findAll({ attributes: this.attributes, where: wheres });
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async findById(params = {}) {
        try {
            const { id } = params.body || params
            return await this.findById({id});
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async create(params = {}) {
        try {
            let obj = params.body || params;
            return await this.create(obj);
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async bulkCreate(objects = []) {
        try {
            return await this.bulkCreate(objects);
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }
}

module.exports = VendorModel;