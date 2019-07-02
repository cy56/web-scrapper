const csv = require('papaparse');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const zipper = require('../zipper');

class dataResolver
{
    static async resolve(file = { filename:null, filepath:null, extension:null, buffer:null }) {
        try {

            let { extension } = file;

            if(extension === '.zip' || extension === '.7z') {
                return await this.resolveForFile(file);
            }

            return await this.resolveForData(file);

        } catch (err) {
            console.error(err.message);
        }
    }

    static async resolveForFile(file) {
        return zipper.unzip(file);

        return this.resolveForData(unzip);
    }

    static async resolveForData(file = { filename:null, buffer:null }) {
        let extension = path.extname(file.filename);

        if(extension === '.csv') {
            return this.resolveForCSV(file);
        }

        return this.resolveForExcel(file);
    }

    static async resolveForExcel() {
        
    }

    static async resolveForCSV() {

    }
}

module.exports = dataResolver;
