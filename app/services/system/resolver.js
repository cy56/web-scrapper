const path = require('path');
const fs = require('fs');
const dateService = require('date-and-time');

class ResolverService
{
    static async resolveParser(params = {}, data) {
        let items = [];
        const { source, brand, vendor, filename } = params;
        const parser = require(`../puppeteer/jobs/parsers/${vendor.toLowerCase()}`);
        for (let index = 0; index < data.length; index++) {
            const date = dateService.format(new Date(params.date), 'YYYY-MM-DD');
            const newParser = new parser({ source, vendor, brand, filename, date }, data[index]);
            items.push(newParser.getResults());
        }
        return items;
    }

    static resolvePath(type, vendor) {
        const timer = Date.parse(dateService.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
        const filename = `${timer}.png`;
        const directory = path.join(__dirname, `../../storages/images/${type}/${vendor}/`);
        fs.exists(directory, (exists) => {
            if (!exists) {
                fs.mkdir(directory, { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }
        });
        const tmpPath = `${directory}${filename}`;
        return { filename, tmpPath };
    }

    static resolveTimer() {

    }

    static resolveDate() {

    }

    static resolveVendorDates() {

    }
}

module.exports = ResolverService;