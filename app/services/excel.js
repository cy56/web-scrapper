const library = require('xlsx');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('util');

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

    static async convertDataToWorkbook(params = { brand: null, vendor:null, report:null }, data) {
        try {
            const resolver = require('./resolver');
            const writeFile = util.promisify(fs.writeFile);
            let { brand, vendor, report } = params;

            if(!brand || !vendor || !report || !data) {
                throw 'missing parameters';
            }

            const filename = resolver.resolveFilename({ report, vendor, extension:'xlsx' });
            const directory = path.join(__dirname, `../storages/exports/${brand}/${vendor}/`);
            const filepath = path.join(__dirname, `../storages/exports/${brand}/${vendor}/${filename}`);
            
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

            if (!fs.existsSync(directory)) {
                await fs.promises.mkdir(directory, { recursive: true });
                await writeFile(filepath, content);
                return { filename, filepath};   
            } else {
                await writeFile(filepath, content);
                return { filename, filepath };
            }

        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = Excel;