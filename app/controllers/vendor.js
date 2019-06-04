//const db = require('../config/db');
const resolver = require('./extensions/resolver');

class Vendor
{
    static async findByParams(req, res) {
        const { vendor } = req.body;
        return res.status(200).send(resolver.test());
    }
}

module.exports = Vendor;