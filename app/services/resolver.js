const fs = require('fs');
const dateResolver = require('./resolvers/date');
const dataResolver = require('./resolvers/data');

class ResolverService
{
    static resolveParser(params = { source:null, brand:null, vendor:null, filename:null, date:null, currency:null }, data) {
        try {
            const parser = require(`../puppeteer/workers/parsers/${params.vendor.toLowerCase()}`);
            const resolved = new parser(params, data);
            return resolved.getResults();
        } catch(err) {
            throw err.message;
        }
    }

    static resolveDates(start, end) {
        return dateResolver.resolveDates(start, end);
    }

    static resolveVendorDates(params = { vendor: null, start: null, end: null }) {
        return dateResolver.resolveVendorDates(params);
    }

    static resolveFile(file) {
        return dataResolver.resolve(file);
    }

    static resolvePath(params = {vendor: null}) {
        try {
            const timer = dateResolver.getTimer();
            const filename = `${timer}.png`;
            const directory = `./app/storages/images/${params.vendor}/`;
            fs.exists(directory, (exists) => {
                if (!exists) {
                    fs.mkdir(directory, { recursive: true }, (err) => {
                        if (err) throw err;
                    });
                }
            });
            const tmpPath = `${directory}${filename}`;
            return { filename, tmpPath };
        } catch(err) {
            throw err.message;
        }
    }
}

module.exports = ResolverService;