const db = require('../services/database');
const datatable = require('../services/datatable');

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Vendor {
    static async getRawSource(req, res) {
        const { source, brand, vendor, startDate, endDate } = req.body;
        if (!source || !brand || !vendor) {
            return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
        }
        return res.status(200).send(resolver.test());
    }

    static async getDataTable(req, res) {
        const { brand, vendor, startDate, endDate } = req.body;
        if (!brand || !vendor) {
            return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
        }
        const model = db[vendor.toLowerCase()];
        const data = await model.getDatatable({ brand: brand.toUpperCase(), startDate, endDate });
        //const dataset = await datatable.resolveDatatable(model.getDatatableFilter(), data);
        return res.status(200).json({ header: model.getDatatableHeader(), data });
    }
}

module.exports = Vendor;