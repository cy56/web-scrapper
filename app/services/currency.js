const library = require('./libraries/currency');

class Currency
{
    static convert(amount, precision=2) {
        return library(amount, {precision}).value;
    }
}

module.exports = Currency