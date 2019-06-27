const csv = require('papaparse');
const fs = require('fs');
const resolver = require('../services/system/resolver');
const db = require('../config/db');

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Uploader
{
    constructor() {

    }

    async resolveFile(file) {
        console.log('resolve file');
        const csvFile = fs.readFileSync(file, "utf8");
        const csvData = csv.parse(csvFile, { header: false, skipEmptyLines: true }).data;
        csvData.shift();
        return csvData;
    }

    async resolveData (params = { source: '', brand: '', vendor: '', filename: '', date: '' }, csvData) {
        return await resolver.resolveParser(params, csvData);
    };

    async insertIntoDB (vendor, resolved) {
        
        const model = db[vendor.toLowerCase()];
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
        const filename = null;
        const { brand, vendor, date } = req.body;
        const file = req.file.path;

        if (!brand || !vendor || !date) {
            return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)' });
        }

        const data = await controller.resolveFile(file);
        const resolved = await controller.resolveData({ source, brand, vendor, filename, date }, data);
        await controller.insertIntoDB(vendor, resolved);

        return res.status(200).json({ code: CODE_PERFECT, message: "Upload Successfully..." });
    } catch (err) {
        return res.status(500).json({ code: CODE_SYSTEM_ERROR, message: `System Error: ${err.message}` });
    }
};