const PuppeteerClient = require('./app/controllers/puppeteer/puppeteer');

class CMD extends PuppeteerClient {
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.login, { visible: true });
        await this.page.type(this.vendor.selectors.partner, this.creds.partner, { delay: 100 });
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 100 });
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.goto(this.vendor.pages.target, { waitUntil: 'load' });
    }

    async scrap(start, end) {
        await this.scrapForSummary(start, end)
        await this.scrapForPlayer(start)
    }

    async scrapForSummary(start, end) {
        await this.filter(start, end)
        let file = await this.download(this.vendor.selectors.exportReport)
        let data = await this._resolver.resolveFile(file)
        await this.resolveForSummary(start, data)
    }

    async scrapForPlayer(date) {
        const liSelector = this.vendor.selectors.drillDownList
        let lists = await this.page.evaluate((liSelector) => {
            let items = []
            const liLists = document.querySelectorAll(liSelector)

            for (let liList of liLists) {
                items.push(liList.getAttribute('href'))
            }

            return items

        }, liSelector)
    }

    async resolveForSummary(date, data) {
        const report = 'summary'
        const source = this.source
        const vendor = this.platform
        const brand = this.brand.toUpperCase() || 'RB88'
        const currency = this.currency || null
        const model = this.db[report.toLowerCase()][vendor.toLowerCase()]
        let results = await this._resolver.resolveParser({ source, brand, vendor, date, currency, report }, data)
        await model.createMany(results)
        return true
    }

    async resolveForPlayer(date, data) {
        const report = 'player'
        const source = this.source
        const vendor = this.platform
        const brand = this.brand.toUpperCase() || 'RB88'
        const currency = this.currency || null
        const model = this.db[report.toLowerCase()][vendor.toLowerCase()]
        let results = await this._resolver.resolveParser({ source, brand, vendor, date, currency, report }, data)
        await model.createMany(results)
        return true
    }

    async logoutProcess() {
        await this.page.goto(this.vendor.pages.logout);
    }
}

module.exports = async (start, end, brand) => {
    const worker = new CMD({ headless: false }, brand);
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        await worker.init();
        await worker.login();
        await worker.gotoReport();
        for (let i = 0; i < dateResolver.length; i++) {
            let start = dateResolver[i].start;
            let end = dateResolver[i].end;
            await worker.scrap(start, end)
        }
        await worker.logout();
    } catch (err) {
        console.error(err.message);
    }
};