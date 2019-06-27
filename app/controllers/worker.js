const CODE_PERFECT = 0;
const CODE_MISSING_PARAMETERS = 8;
const CODE_SYSTEM_ERROR = 9;

class Worker
{
    constructor(params = { brand: null, vendor:null, start: null, end: null }) {
        if(!params.brand || !params.vendor || !params.start) {
            throw 'missing parameters';
        }

        this.vendor = params.vendor.toUpperCase();
        this.start = params.start;
        this.end = params.end || params.start;
        this.brand = params.brand.toUpperCase();
        this.module = require(`./app/services/puppeteer/jobs/${params.vendor}`);
    }

    async work() {
        try {
            await this.module(this.start, this.end, this.brand);
        } catch(err) {
            console.error(`Worker Failed: ${err.message}`);
        }
    }
}

exports.serve = async (req, res) => {
    try {
        const { brand, vendor, start, end } = req.body || req;
        const worker = new Worker({ brand, vendor, start, end});
        res.status(200).send(worker.brand);
        //await worker.work();
    } catch (err) {
        res.status(500).send({ code: CODE_SYSTEM_ERROR, message: err.message });
    }
}