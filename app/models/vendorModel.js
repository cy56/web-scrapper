const Sequelize = require('sequelize');
const Resolver = require('../services/system/resolver');

class VendorModel extends Sequelize.Model {
    static setup() {
        return super.init(this.getModelStructure(), { indexes: this.getModelIndex(), sequelize: this.sequelize });
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
            let { brand, startDate, endDate } = params.body || params;

            if(!brand || !startDate) {
                throw 'missing parameters';
            }

            if(!endDate) {
                endDate = startDate;
            }

            const wheres = {
                brand, date: {
                    $between: Resolver.resolveDates(startDate, endDate)
                }
            }

            console.log(wheres);

            return await this.findAll({ attributes: this.getDatatableGroupBy().attributes, group: this.getDatatableGroupBy().groupBy, where: wheres, raw: true });

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

module.exports = VendorModel;