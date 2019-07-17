const Sequelize = require('sequelize');
const Resolver = require('../../services/resolver');

class Vendor extends Sequelize.Model {
    static setup() {
        return super.init(this.getModelStructure(), { indexes: this.getModelIndex(), sequelize: this.sequelize, underscored: true, freezeTableName: true, tableName:this.table });
    }

    static async getRawSource(params = {}) {
        try {
            const wheres = params.body || params;
            return await this.findAll({ attributes: this.getModelDefaultAttributes(), where: wheres, raw:true });
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async getDatatable(params = {}) {
        try {
            let { brand, startDate, endDate, currency } = params.body || params;
            let wheres = {};

            if(!endDate) {
                endDate = startDate;
            }

            if (brand) {
                wheres.brand = brand;
            }

            if (currency) {
                wheres.currency = currency;
            }

            wheres.date = {
                [this.Datatypes.Op.between]: Resolver.resolveDates(startDate, endDate)
            }
            
            return await this.findAll({ attributes: this.getModelDefaultAttributes(), where: wheres, raw: true });

        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }

    static async findOne(params = {}) {
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
            return await this.bulkCreate(objects, { updateOnDuplicate: this.getOnDuplicateValues() });
        } catch (err) {
            console.error('Database Error: ', err.message);
        }
    }
}

module.exports = Vendor;