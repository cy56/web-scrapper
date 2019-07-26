const _ = require('lodash');
const csv = require('papaparse');
const path = require('path');
const fs = require('fs');
const zipper = require('./zipper');
const excel = require('./excel');

class Filer
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
                items = this.resolveForCSV(files);
            } else {
                items = this.resolveForExcel(files);
            }
        }

        return items;
    }

    static resolveForExcel(file = { filename: null, filepath:null }) {
        let target = file.filepath || file.filename;
        let data = excel.exportToSheets({ filepath: target });
        fs.unlinkSync(target);
        return data;
    }

    static resolveForCSV(file = { filename: null, filepath:null }) {
        let target = file.filepath || file.filename;
        let csvFile = fs.readFileSync(target, "utf8");
        let data = csv.parse(csvFile, { header: false, skipEmptyLines: true }).data;
        fs.unlinkSync(target);
        return data;
    }
}

module.exports = Filer;
