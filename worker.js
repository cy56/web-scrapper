class Worker {
    constructor(params = { vendor: null, start: null, end: null, brand: null }) {
        if (params.vendor == null || params.start == null || params.brand == null) {
            throw "missing parameters";
        }

        this.vendor = params.vendor.toUpperCase();
        this.start = params.start;
        this.end = params.end || params.start;
        this.brand = params.brand.toUpperCase();
        this.module = require(`./app/services/puppeteer/jobs/${params.vendor}`);

        return this;
    }

    async work() {
        await this.module(this.start, this.end, this.brand);
    }
}

module.exports = async function work(jobs = [], options = { start: null, end: null, brand:null }) {
    jobs.forEach(async (job) => {
        const worker = new Worker({ vendor: job, start: options.start, end: options.end, brand: options.brand });
        await worker.work();
    });
}