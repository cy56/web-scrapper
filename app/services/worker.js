class Worker
{
    constructor(params = { vendor: null, start: null, end: null }) {
        if (params.vendor == null || params.start == null) {
            throw "missing parameters";
        }

        this.vendor = params.vendor.toUpperCase();
        this.start = params.start;
        this.end = params.end || params.start;
        this.module = require(`../jobs/${params.vendor}`);

        return this;
    }

    async work() {
        await this.module(this.start, this.end);
    }
}

module.exports = async function work(jobs=[], options={start:null, end:null}) {
    for (let index = 0; index < jobs.length; index++) {
        const worker = new Worker({vendor:jobs[index], start:options.start, end:options.end});
        await worker.work();
    }
}