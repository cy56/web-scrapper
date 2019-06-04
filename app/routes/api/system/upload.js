const express = require('express');
const multer = require('multer');
const csv = require('papaparse');
const fs = require('fs');
const resolver = require('../../../services/system/resolver');

const router = express.Router();
const upload = multer({ dest: '/tmp/csv' });

const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const source = 'hydra';
        const filename = '';
        const { brand, vendor, date } = req.body;
        const file = req.file.path;

        if(!brand || !vendor || !date) {
            return res.status(400).json({ code: CODE_MISSING_PARAMETERS, message: 'Missing Parameter(s)'});
        }
        
        const data = await resolveFile(file);
        const resolved = await resolveData({source, brand, vendor, filename, date}, data);
        await insertIntoDB(vendor, resolved);
        
        return res.status(200).json({ code: CODE_PERFECT, message: "Upload Successfully..."});
    } catch (err) {
        return res.status(500).json({ code: CODE_SYSTEM_ERROR, message:"System Error"});
    }
});

resolveFile = (file) => {
    console.log('resolve file');
    const csvFile = fs.readFileSync(file, "utf8");
    const csvData = csv.parse(csvFile, { header: false, skipEmptyLines: true }).data;
    csvData.shift();
    return csvData;
}

resolveData = async(params = {source:'', brand:'', vendor:'', filename:'', date:''}, csvData) => {
    return await resolver.resolveParser(params, csvData);
};

insertIntoDB = async(vendor, resolved) => {
    const db = require('../../../config/db');
    const model = db[vendor.toLowerCase()];
    await model.createMany(resolved);
};

removeFile = async(file) => {
    await fs.unlinkSync(file);
};

module.exports = router;