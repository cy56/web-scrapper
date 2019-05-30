const PuppeteerClient = require('../services/puppeteer');

class YGG extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async loginProcess() {
        await this.page.setExtraHTTPHeaders({ Authorization: `Basic ${new Buffer(`${this.creds.first.username}:${this.creds.first.password}`).toString('base64')}` });
        await this.page.goto('https://bo-prod-sg.ygg-7ehd83n.com:8443/backoffice/login.xhtml');
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
        await this.page.waitFor(this.vendor.selectors.filterGroup);
        await this.page.click(this.vendor.selectors.startDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.startDate, start);
        await this.page.click(this.vendor.selectors.endDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.endDate, end);
        await this.page.select(this.vendor.selectors.filterBrand, 'RB88');
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.page.selectors.table;
        await this.page.waitFor(3000);
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

module.exports = async function run(start, end) {
    const worker = new YGG({ headless: false });
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        await worker.init();
        await worker.login();
        await worker.gotoReport();
        for (let index = 0; index < dateResolver.dates.length; index++) {
            const start = dateResolver.dates[index].start;
            const end = dateResolver.dates[index].end;
            await worker.filterConditions(start, end);
            await worker.extractHtmlTable();
            await worker.resolveSource(start);
            await worker.insertIntoDB();
        }
        await worker.logout();
        return 'Task Done!!!';
    } catch (err) {
        console.error(err.message);
    }
}