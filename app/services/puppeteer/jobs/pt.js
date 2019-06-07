const PuppeteerClient = require('../base');

class PT extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async login(currency) {
        await this.page.goto(this.vendor.pages.login[currency]);
        await this.page.waitFor(this.vendor.selectors.login, { visible: true });
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, creds[currency].username, { delay: 100 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, creds[currency].password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.report, { visible: true });
        await this.page.click(this.vendor.selectors.report);
    }

    async filterConditionsProcess(start, end) {
        await this.page.waitFor(this.vendor.selectors.reportBoth, {visible:true});
        await this.page.click(this.vendor.selectors.reportBoth);
        await this.page.focus(this.vendor.selectors.startDate);
        await this.page.type(this.vendor.selectors.startDate, start);
        await this.page.focus(this.vendor.selectors.endDate);
        await this.page.type(this.vendor.selectors.endDate, end);
        await this.page.select(this.vendor.selectors.endTime, "23");
        await this.page.click(this.vendor.selectors.showProgressive);
        await this.page.click(this.vendor.selectors.showRealMoney);
        await this.page.click(this.vendor.selectors.showLiveGames);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(3000);
        return await page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table1length; index++) {
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
    const currencies = ['cny', 'thb'];
    const worker = new PT({ headless: false });
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        currencies.forEach((currency) => {
            await worker.init();
            await worker.login(currency);
            await worker.gotoReport();
            dateResolver.forEach((dates) => {
                const start = dates.start;
                const end = dates.end;
                await worker.filterConditions(start, end);
                await worker.extractHtmlTable();
                await worker.resolveSource(start);
                await worker.insertIntoDB();
            });
            await worker.logout();
        });
    } catch (err) {
        console.error(err.message);
    }
};