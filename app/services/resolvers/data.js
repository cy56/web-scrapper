const _ = require('lodash');
const csv = require('papaparse');
const path = require('path');
const fs = require('fs');
const zipper = require('../zipper');
const excel = require('../excel');

class dataResolver
{
    static async resolve(file = { filename:null, filepath:null, extension:null }) {
        try {

            let { extension } = file;

            if(extension === '.zip') {
                return await this.resolveForFile(file);
            }

            return await this.resolveForData(file);

        } catch (err) {
            console.error(err.message);
        }
    }

    static async resolveForFile(file) {
        let unzip = zipper.unzip(file);

        return this.resolveForData(unzip);
    }

    static resolveForData(files) {
        let items = [];

        if(Array.isArray(files)) {
            files.forEach((file) => {
                let extension = path.extname(file.filename);
                if (extension === '.csv') {
                    return items.push(this.resolveForCSV(file));
                }

                return items.push(this.resolveForExcel(file));
            });
        }

        if (_.isPlainObject(files)) {
            let extension = path.extname(files.filename);

            if (extension === '.csv') {
                items.push(this.resolveForCSV(files));
            } else {
                items.push(this.resolveForExcel(files));
            }
        }

        return items;
    }

    static resolveForExcel(file = { filename: null, filepath:null }) {
        let target = file.filepath || file.filename;

        return excel.exportToSheets({ filepath: target });
    }

    static resolveForCSV(file = { filename: null, filepath:null }) {
        let target = file.filepath || file.filename;
        let csvFile = fs.readFileSync(target, "utf8");

        return csv.parse(csvFile, { header: true, skipEmptyLines: true }).data;
    }
}

module.exports = dataResolver;
