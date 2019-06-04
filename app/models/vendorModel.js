const Sequelize = require('sequelize');

class VendorModel extends Sequelize.Model {
    static setup() {
        return super.init(this.structure, { indexes: this.indexes, sequelize: this.sequelize });
    }

    static async searchByParams(params = {}) {
        try {
            const wheres = params.body || params;
            return await this.findAll({ attributes: this.attributes, where: wheres });
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async searchById(params = {}) {
        try {
            const { id } = params.body || params
            return await this.findById({id});
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async createOne(params = {}) {
        try {
            let obj = params.body || params;
            console.log(obj);
            return this.create(obj);
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async createMany(objects = []) {
        try {
            return await this.bulkCreate(objects);
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }
}

module.exports = VendorModel;