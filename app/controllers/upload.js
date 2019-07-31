const csv = require('papaparse');
const fs = require('fs');
const mapper = require('../services/mapper');
const db = require('../services/database');

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Uploader
{
    async resolveFile(file) {
        const csvFile = fs.readFileSync(file, "utf8");
        const csvData = csv.parse(csvFile, { header: false, skipEmptyLines: true }).data;
        return csvData;
    }

    async resolveData (params = { source: null, brand: null, vendor: null, report: null, date: null }, csvData) {
        return await (new mapper(params, csvData)).getResults();
    };

    async insertIntoDB (params = { vendor: null, report: null }, resolved) {
        const model = db[params.report.toLowerCase()][params.vendor.toLowerCase()];
        await model.createMany(resolved);
    };

    async removeFile (file) {
        await fs.unlinkSync(file);
    };
}

exports.upload = async (req, res) => {
    try {
        const controller = new Uploader();
        const source = 'hydra';
        const { brand, vendor, date, report } = req.body;
        const file = req.file.path;

        if (!brand || !vendor || !date || !report) {
            return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
        }

        const data = await controller.resolveFile(file);
        const resolved = await controller.resolveData({ source, brand, vendor, report, date }, data);
        
        await controller.insertIntoDB({ vendor, report }, resolved);

        return res.status(200).json({ code: CODE_PERFECT, message: "Upload Successfully..." });
    } catch (err) {
        return res.status(500).json({ code: CODE_SYSTEM_ERROR, message: `System Error: ${err.message}` });
    }
};