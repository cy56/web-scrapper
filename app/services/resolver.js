const fs = require('fs');
const _ = require('lodash');
const db = require('./database');
const dateResolver = require('./resolvers/date');
const dataResolver = require('./resolvers/data');

class ResolverService
{
    static resolveParser(params = { source:null, brand:null, vendor:null, date:null, currency:null, report:null }, data) {
        try {
            let {source, brand, vendor, date, currency, report} = params;
            const converter = require('./parser');
            const model = db[report.toLowerCase()][vendor.toLowerCase()];
            const parser = model.getVendorParserColumns();
            const cast = model.getParserCast();
            const resolved = new converter(params, data, {parser, cast});
            return resolved.getResults();
        } catch(err) {
            throw err.message;
        }
    }

    static resolveDate(date) {
        return dateResolver.resolveDate(date);
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
            const unknown = (_.isObject(options)) ? (options.hasOwnProperty('date')) ? options.date : dateResolver.getTimer() : dateResolver.getTimer();
            const filename = `${unknown}.${filetype}`;
            const filepath = `${directory}${filename}`;
            const file = { filename, filepath };
            
            await fs.exists(directory, async (exists) => {
                if (!exists) {
                    await fs.mkdir(directory, { recursive: true }, (err) => {
                        if (err) throw err;
                        if (cb) {
                            return cb(file, options);
                        }
                    });
                } else {
                    if (cb) {
                        return cb(file, options);
                    }
                }
            });
            
            return file;

        } catch(err) {
            throw err.message;
        }
    }
}

module.exports = ResolverService;