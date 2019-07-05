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

    static async resolvePath(directory, filetype, options = null, cb = null) {
        try {
            const timer = dateResolver.getTimer();
            const filename = `${timer}.${filetype}`;
            const filepath = `${directory}${filename}`;
            const file = { filename, filepath };
            
            await fs.exists(directory, async (exists) => {
                if (!exists) {
                    await fs.mkdir(directory, { recursive: true }, (err) => {
                        if (err) throw err;
                        if(cb) {
                            cb(file, options);
                        }
                    });
                }
            });
            
            return file;

        } catch(err) {
            throw err.message;
        }
    }
}

module.exports = ResolverService;