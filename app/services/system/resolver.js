const path = require('path');
const fs = require('fs');
const dateService = require('date-and-time');
const _ = require('lodash');

class ResolverService
{
    static resolveParser(params = { source:null, brand:null, vendor:null, filename:null, date:null, currency:null }, data) {
        try {
            const parser = require(`../puppeteer/jobs/parsers/${params.vendor.toLowerCase()}`);
            const resolved = new parser(params, data);
            return resolved.getResults();
        } catch(err) {
            throw err.message;
        }
    }

    static resolveDatatable(keys=null, data=null) {
        try {
            if(!keys || !data) {
                throw 'no keys or dataset';
            }

            let datas = _.orderBy(data, ['currency'], ['asc']);
            let items = [];
            let lastItem = null;

            datas.forEach((obj) => {
                if(lastItem === null) {
                    lastItem = obj;
                    return;
                }

                if(lastItem.currency === obj.currency) {
                    if(lastItem.source !== obj.source) {
                        if(_.isEqual(_.omit(lastItem, keys), _.omit(obj, keys))) {
                            lastItem.diff = false;
                            obj.diff = false;
                            items.push(lastItem);
                            items.push(obj);
                        } else {
                            lastItem.diff = true;
                            obj.diff = true;
                            items.push(lastItem);
                            items.push(obj);
                        }
                        lastItem = null;
                    }
                }
            });
            return items;
        } catch(err) {
            throw err.message;
        }
    }

    static resolvePath(params = { type: null, vendor: null}) {
        try {
            const timer = Date.parse(dateService.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
            const filename = `${timer}.png`;
            const directory = path.join(__dirname, `../../storages/images/${params.type}/${params.vendor}/`);
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

    static resolveDates(start, end) {
        return [dateService.format(new Date(start), 'YYYY-MM-DD'), dateService.format(new Date(end), 'YYYY-MM-DD')];
    }

    static resolveVendorDates(params = { vendor: null, start: null, end: null }) {
        try {
            let { vendor, start, end } = params;

            if(!vendor || !start) {
                throw "missing parameters";
            }

            if(!end) {
                end = start;
            }

            let items = this.getResolvedDateTime(start, end);
            const func = `resolveFor${vendor.toUpperCase()}`;
            return this[func](items);

        } catch(err) {
            console.log(err.message);
        }
    }

    static getResolvedDateTime(start, end) {
        let items = [];
        let diff = dateService.subtract(new Date(end), new Date(start)).toDays();

        if (diff === 0) {
            items.push({ start: new Date(start), end: new Date(start) });
        } else {
            items.push({ start: new Date(start), end: new Date(start) });
            for (let index = 0; index < diff; index++) {
                items.push(this.incrementDays(new Date(start)));
            }
        }

        return items;
    }

    static incrementDays(tDate) {
        let nDate = dateService.addDays(tDate, 1);
        return { start: nDate, end: nDate };
    }

    static resolveForCMD(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM-DD-YYYY');
            let end = dateService.format(item.end, 'MM-DD-YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForGD(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForMG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(item.end, 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForTGP(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(item.end, 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForPGS(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(item.end, 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForGEN(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSBT(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD/MM/YYYY 00:00:00');
            let end = dateService.format(item.end, 'DD/MM/YYYY 23:59:59');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForBSG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD MMM YYYY 00:00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'DD MMM YYYY 00:00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForYGG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD 00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForAB(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 12:00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD 12:00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForAG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 00:00:00');
            let end = dateService.format(item.end, 'YYYY-MM-DD 23:59:59');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForBETTRADE(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD MMM YYYY');
            let end = dateService.format(item.end, 'DD MMM YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForIPSB(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(item.end, 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForNLE(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSAG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSLC(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM/DD/YYYY');
            let end = dateService.format(item.end, 'MM/DD/YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSPG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM/DD/YYYY');
            let end = dateService.format(item.end, 'MM/DD/YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }
}

module.exports = ResolverService;