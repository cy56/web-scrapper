const PuppeteerClient = require('../base');

class CMD extends PuppeteerClient
{
    constructor(options = {}, brand='rb88') {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.login, { visible: true });
        await this.page.type(this.vendor.selectors.partner, this.creds.partner);
        await this.page.type(this.vendor.selectors.username, this.creds.username);
        await this.page.type(this.vendor.selectors.password, this.creds.password);
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(3000);
        await this.page.goto(this.vendor.pages.target);
    }

    async filterConditionsProcess(start, end) {
        const fitlers = {
            start: this.vendor.selectors.dateFrom,
            end: this.vendor.selectors.dateTo
        };
        await this.page.waitFor(this.vendor.selectors.dateFrom, { visible: true });
        await this.page.evaluate((fitlers) => {
            let from = document.querySelector(fitlers.end);
            let to = document.querySelector(fitlers.start);
            from.removeAttribute('readonly');
            to.removeAttribute('readonly');
            from.value = '';
            to.value = '';
        }, fitlers);
        await this.page.type(this.vendor.selectors.dateFrom, start);
        await this.page.type(this.vendor.selectors.dateTo, end);
        await this.page.click(this.vendor.selectors.submit);
    }

    async extractHtmlTableProcess() {
        const sources = this.vendor.sources;
        this.page.waitFor(10000);
        return await this.page.evaluate((sources) => {
            let items = [];
            let grayItems = document.querySelectorAll(sources.tableGray);
            let lightItems = document.querySelectorAll(sources.tableLight);
            grayItems.forEach((item) => {
                items.push(item.outerText.split('\t'));
            });
            lightItems.forEach((item) => {
                items.push(item.outerText.split('\t'));
            });
            return items;
        }, sources);
    }

    async logoutProcess() {
        await this.page.goto(this.vendor.pages.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new CMD({ headless: false }, brand);
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        await worker.init();
        await worker.login();
        await worker.gotoReport();
        for (let i = 0; i < dateResolver.length; i++) {
            let start = dateResolver[i].start;
            let end = dateResolver[i].end;
            await worker.filterConditions(start, end);
            await worker.extractHtmlTable();
            await worker.resolveSource(start);
            await worker.insertIntoDB();
        }
        await worker.logout();
    } catch (err) {
        console.error(err.message);
    }
};