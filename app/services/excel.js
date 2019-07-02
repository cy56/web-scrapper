const xlsx = require('xlsx');

class Excel
{
    static exportToSheets(file = {filename: null, filepath: null}) {
        const workbook = xlsx.readFile(file.filepath)
    }
}

module.exports = Excel;