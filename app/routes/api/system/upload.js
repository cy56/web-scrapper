const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: '/tmp/csv' });


router.post('/', upload.single('file'), async(req, res) => {
    const fileRows = [];
    const resolved = [];
    const { brand, vendor, date } = req.body;
    const filename = req.file.path;
    //Import Library
    const parser = require(`../../../parsers/${vendor.toLowerCase()}`);
    //open uploaded file
    csv.fromPath(filename)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            fs.unlinkSync(filename);
            if(fileRows.length === 0 ) {
                return res.status(404).json({message:'data is empty'});
            }

            for(let index=1; index < fileRows.length; index++) {
                let data = new parser({ source: 'hydra', vendor, filename: '', date }, fileRows[index]);
                resolved.push(data.getResults());
            }

            return res.status(200).json(resolved);
        });
});

module.exports = router;