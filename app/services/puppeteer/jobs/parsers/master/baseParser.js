const libcur = require('../../../../system/currency');
const dateService = require('date-and-time');

class BaseParser
{
    constructor(params = {}) {
        const { source, brand, vendor, filename, date } = params;
        this.source = source;
        this.brand = brand;
        this.vendor = vendor;
        this.filename = filename;
        this.date = dateService.format(new Date(date), 'YYYY-MM-DD');
        this.datas = [];
    }

    resolveValue(value, precision=2) {
        return libcur.convert(value, precision);
    }

    getResults() {
        return this.datas;
    }
}

module.exports = BaseParser;