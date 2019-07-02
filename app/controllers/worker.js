const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Worker
{
    constructor(params = { brand: null, vendor:null, start: null, end: null }) {

        if(!params.brand || !params.vendor || !params.start) {
            throw 'missing parameters';
        }

        this.vendor = params.vendor.toLowerCase();
        this.start = params.start;
        this.end = params.end || params.start;
        this.brand = params.brand.toUpperCase();
        this.module = require(`./puppeteer/workers/${params.vendor}`);
    }

    async work() {
        try {
            await this.module(this.start, this.end, this.brand);
        } catch(err) {
            console.error(`Worker Failed: ${err}`);
        }
    }
}

exports.serve = async (req, res) => {
    try {
        const { brand, vendor, start, end } = req.body || req;
        const worker = new Worker({ brand, vendor, start, end });
        await worker.work();
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ code: CODE_SYSTEM_ERROR, message: 'System Error' });
    }
}