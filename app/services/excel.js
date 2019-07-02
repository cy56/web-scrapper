const xlsx = require('xlsx');

class Excel
{
    static exportToSheets(file = {filename: null, filepath: null}) {
        let data = {};
        let target = file.filepath || file.filename;
        
        const workbook = xlsx.readFile(target);

        workbook.SheetNames.forEach((sheet) => {
            let worksheet = workbook.Sheets[sheet];
            data[sheet] = xlsx.utils.sheet_to_json(worksheet);
        });

        return { sheetNames: workbook.SheetNames, data };
    }
}

module.exports = Excel;