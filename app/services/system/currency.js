const libs = require('../../libraries/currency');

class Currency
{
    static convert(amount, precision=2) {
        return libs(amount, {precision}).value;
    }
}

module.exports = Currency