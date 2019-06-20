const PuppeteerClient = require('../base');

class YGG extends PuppeteerClient {
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.setExtraHTTPHeaders({ Authorization: `Basic ${new Buffer(`${this.creds.first.username}:${this.creds.first.password}`).toString('base64')}` });
        await this.page.goto(this.vendor.pages.login);
        await this.page.type(this.vendor.selectors.username, this.creds.second.username);
        await this.page.type(this.vendor.selectors.password, this.creds.second.password);
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.report, {visible:true});
        await this.page.click(this.vendor.selectors.report);
        await this.page.waitFor(this.vendor.selectors.reportOperator, { visible: true });
        await this.page.click(this.vendor.selectors.reportOperator);
    }

    async filterConditionsProcess(start, end) {
        await this.page.waitFor(this.vendor.selectors.filterGroup, { visible:true });
        await this.page.click(this.vendor.selectors.startDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.startDate, start);
        await this.page.click(this.vendor.selectors.endDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.endDate, end);
        await this.page.select(this.vendor.selectors.filterBrand, 'RB88');
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                items.push(table[index].outerText.split('\t'));
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.logout, {visible:true});
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new YGG({ headless: false }, brand);
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        await worker.init();
        await worker.login();
        await worker.gotoReport();
        for (let index = 0; index < dateResolver.length; index++) {
            const start = dateResolver[index].start;
            const end = dateResolver[index].end;
            await worker.filterConditions(start, end);
            await worker.extractHtmlTable();
            await worker.resolveSource(start);
            await worker.insertIntoDB();
        }
        await worker.logout();
    } catch (err) {
        console.error(err.message);
    }
}