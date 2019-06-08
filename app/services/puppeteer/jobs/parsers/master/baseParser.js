const libcur = require('../../../../system/currency');
const dateService = require('date-and-time');
const _ = require('lodash');

class BaseParser
{
    constructor(params = { source: null, brand: null, vendor: null, filename: null, date: null, currency:null }) {
        const { source, brand, vendor, filename, date } = params;
        this.source = source;
        this.brand = brand;
        this.vendor = vendor;
        this.filename = filename;
        this.date = dateService.format(new Date(date), 'YYYY-MM-DD');
        this.datas = [];
        this._ = _;
    }

    cleanData(items) {
        for (let index = 0; index < items.length; index++) {
            if (this.source.toLowerCase() !== 'hydra') {
                this.datas.push(this.resolveForVendor(items[index]));
            }
            this.datas.push(this.resolveForHydra(items[index]));
        }
    }

    resolveValue(value, precision=2) {
        return libcur.convert(value, precision);
    }

    getResults() {
        return this.datas;
    }
}

module.exports = BaseParser;