const excel = require('../services/excel');
const dataframe = require('../services/dataframe');
const zipper = require('../services/zipper');
const db = require('../services/database');
const _ = require('lodash');

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Exporter
{
    async export(options = { brand:null , vendor:null, report:null, start:null, end:null }) {
        try {
            const summary = await this.getSummaryReport(options);
            console.log(summary);
        } catch (error) {
            console.error(error);
        }
    }

    async getSummaryReport(options) {

        let { brand, vendor, report, start, end } = options;

        const model = db[report.toLowerCase()][vendor.toLowerCase()];
        let data = await model.getDatatable({ brand, start, end });
        let compares = model.getOnDuplicateValues();
        let indexes = model.getDataIndexes();

        if(_.isUndefined(data)) {
            return false;
        }
        
        let results = await dataframe.diff(data, compares, indexes);
        
        return results;
    }

    async getPlayerReport(options) {

    }

    async packages(options, packages) {
        
    }
}

exports.export = async (req, res) => {
    const controller = new Exporter();
    let { brand, vendor, report, start, end } = req.body;

    if(!brand || !vendor || !start || !report) {
        return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
    }

    const file = await controller.export({ brand, vendor, report, start, end});

    return res.status(200).send('ok');
};