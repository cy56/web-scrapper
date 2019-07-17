const _ = require('lodash');
const db = require('../services/database');
const datatable = require('../services/datatable');

const CODE_PERFECT = 0;
const CODE_NO_RESULTS = 7;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Vendor {
   async getDataTable(params = { brand: null, vendor: null, report: null, startDate: null, endDate: null }) {
        try {
            let { brand, vendor, report, startDate, endDate, currency } = params;
            let wheres = {};

            if(!brand || !vendor || !report || !startDate) {
                return CODE_MISSING_PARAMETERS;
            }

            wheres.brand = brand;
            wheres.startDate = startDate;
            wheres.endDate = endDate;

            if(report.toLowerCase() === 'player') {
                if(!currency) {
                    return CODE_MISSING_PARAMETERS
                }

                wheres.currency = currency;
            }

            const model = db[report.toLowerCase()][vendor.toLowerCase()];
            const results = await model.getDatatable(wheres);

            if(_.isEmpty(results)) {
                return CODE_NO_RESULTS;
            }

            const columns = model.getDatatableColumns();
            const compares = model.getOnDuplicateValues();
            const join = model.getDataIndexes();

            const table = new datatable(results, columns, compares, join);

            return { header: model.getDatatableHeader(), data: table.generateDatatable() } ;

        } catch (error) {
            console.error(error);
            return CODE_SYSTEM_ERROR;
        }
   }
}

exports.getDataTable = async(req, res) => {
    const controller = new Vendor();

    const results = await controller.getDataTable(req.body);

    if (results === CODE_MISSING_PARAMETERS) {
        return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
    }

    if (results === CODE_NO_RESULTS) {
        return res.status(404).json({ code: CODE_NO_RESULTS, message: 'No results' });
    }

    if (results === CODE_SYSTEM_ERROR) {
        return res.status(500).json({ code: CODE_NO_RESULTS, message: 'System Errors'});
    }

    return res.status(200).json({ code: CODE_PERFECT, message: results });
}