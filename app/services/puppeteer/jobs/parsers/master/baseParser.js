const libcur = require('../../../../system/currency');

class BaseParser
{
    constructor(params = {}) {
        const { source, brand, vendor, filename, date } = params;
        this.source = source;
        this.brand = brand;
        this.vendor = vendor;
        this.filename = filename;
        this.date = date;
        this.datas = [];
    }

    resolveValue(value, precision=2) {
        return libcur.convert(value, precision);
    }
}

module.exports = BaseParser;