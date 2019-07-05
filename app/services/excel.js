const library = require('xlsx');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const resolver = require('./resolver');

class Excel
{
    static exportToSheets(file = {filename: null, filepath: null}) {
        let data = {};
        let target = file.filepath || file.filename;
        
        const workbook = library.readFile(target);

        workbook.SheetNames.forEach((sheet) => {
            let worksheet = workbook.Sheets[sheet];
            data[sheet] = library.utils.sheet_to_json(worksheet);
        });

        return { sheetNames: workbook.SheetNames, data };
    }

    static async convertDataToWorkbook(params = { brand: null, vendor:null }, data) {
        try {
            let { brand, vendor } = params;

            if(!brand || !vendor || !data) {
                throw 'missing data';
            }

            const exportDirectory = path.join(__dirname, `../storages/exports/${brand}/${vendor}/`);
            const workbook = library.utils.book_new();

            let end = false;
            let count = 0;
            
            while (!end) {
                let worksheet = null;
                let index = Object.keys(data)[count];

                if (_.isUndefined(index)) {
                    end = true;
                }

                if (!_.isUndefined(index)) {
                    if (!worksheet) {
                        worksheet = library.utils.json_to_sheet(data[index]);
                    }

                    if (worksheet) {
                        library.utils.book_append_sheet(workbook, worksheet, index);
                    }
                }
                count++;
            };

            const content = library.write(workbook, { type: 'buffer', bookType: 'xlsx', bookSST: false });

            const file = await resolver.resolvePath(exportDirectory, 'xlsx', content, (file, content) => {
                fs.writeFileSync(file.filepath, content);
                return file;
            });

            return file;

        } catch(err) {
            console.error(err.message);
        }
    }
}

module.exports = Excel;