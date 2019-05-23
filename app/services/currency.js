const libs = require('../../exts/currency');

class Currency
{
    static convert(amount) {
        return libs(amount).value;
    }
}

module.exports = Currency