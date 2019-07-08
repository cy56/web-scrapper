const excel = require('../services/excel');
const dataframe = require('../services/dataframe');
const zipper = require('../services/zipper');
const db = require('../services/database');

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Exporter
{
    constructor() {

    }

    static async export(options = { brand, source, start, end }) {
        try {

            if (!brand, !source || !start || !end) {
                throw 'missing parameters';
            }

            const summary = await this.getSummaryReport(options);
            const player = await this.getPlayerReport(options);
            

        } catch (err) {
            
        }
    }

    static async getSummaryReport(options) {
        let { brand, source, start, end } = options;
        const model = db[source.toLowerCase()];
        let data = model.getDatatable({ brand, start, end });
        let compares = model.getOnDuplicateValues();
        let indexes = model.getDataIndexes();
        let results = await dataframe.diff(data, compares, indexes);
        
        return results;
    }

    static async getPlayerReport(options) {

    }

    static packages(options, packages) {
        
    }
}

module.export = async (req, res) => {
    const controller = new Exporter();
    let { brand, source, start, end } = req.body;

    if(!brand, !source || !start || !end) {
        return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
    }

    const file = await controller.export({ brand, source, start, end});

    return res.status(200).download(file.filepath);

};