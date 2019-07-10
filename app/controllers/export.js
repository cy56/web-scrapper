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
            let files = [];

            const summary = await this.getSummaryReport(options);
            const player = await this.getPlayerReport(options);

            if(summary) {
                files.push(summary);
            }

            if(player) {
                files.push(player);
            }

            return await this.packages(options, files);

        } catch (error) {
            console.error(error);
        }
    }

    async getSummaryReport(options) {

        let { brand, vendor, start, end } = options;
        let report = 'summary';
        const model = db[report][vendor.toLowerCase()];
        let data = await model.getDatatable({ brand, start, end });
        let compares = model.getOnDuplicateValues();
        let indexes = model.getDataIndexes();

        if(_.isUndefined(data)) {
            return false;
        }
        
        let results = await dataframe.diff(data, compares, indexes);

        const file = await excel.convertDataToWorkbook({ brand, vendor, report }, results);
        
        return file;
    }

    async getPlayerReport(options) {
        let { brand, vendor, start, end } = options;
        let report = 'player';

        const model = db[report][vendor.toLowerCase()];
        let data = await model.getDatatable({ brand, start, end });
        let compares = model.getOnDuplicateValues();
        let indexes = model.getDataIndexes();

        if(_.isUndefined(data)) {
            return false;
        }
        
        let results = await dataframe.diff(data, compares, indexes);

        const file = await excel.convertDataToWorkbook({ brand, vendor, report }, results);
        
        return file;
    }

    async packages(options, files) {
        return await zipper.zip(options, files);
    }
}

exports.export = async (req, res) => {
    const controller = new Exporter();
    let { brand, vendor, start, end } = req.body;

    if(!brand || !vendor || !start) {
        return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
    }

    const file = await controller.export({ brand, vendor, start, end});

    return res.status(200).send('ok');
};