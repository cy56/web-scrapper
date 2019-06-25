const PuppeteerClient = require('../base');

class PT extends PuppeteerClient {
    constructor(options = {}, currency, brand) {
        super(options);
        this.currency = currency;
        this.brand = brand;
        this.first = true;
    }

    async login() {
        await this.page.goto(this.vendor.pages.login[this.currency]);
        await this.page.waitFor(this.vendor.selectors.login, { visible: true });
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds[this.currency].username, { delay: 100 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds[this.currency].password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(10000);
        await this.page.goto(this.vendor.pages.report[this.currency]);
    }

    async filterConditionsProcess(start, end) {
        await this.page.waitFor(10000);
        if(this.first) {
            await this.page.waitFor(this.vendor.selectors.reportBoth, { visible: true });
            await this.page.click(this.vendor.selectors.reportBoth);
            await this.page.select(this.vendor.selectors.endTime, "23");
            await this.page.click(this.vendor.selectors.showProgressive);
            await this.page.click(this.vendor.selectors.showRealMoney);
            await this.page.click(this.vendor.selectors.showLiveGames);
            await this.page.click(this.vendor.selectors.reportByMonthly);
        }
        await this.page.focus(this.vendor.selectors.startDate);
        await this.page.type(this.vendor.selectors.startDate, start);
        await this.page.focus(this.vendor.selectors.endDate);
        await this.page.type(this.vendor.selectors.endDate, end);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            items.push(table[table.length - 1].outerText.split('\t'));
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(5000);
        await this.page.goto(this.vendor.pages.logout[this.currency]);
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.click(this.vendor.selectors.logout);
    }

    async test() {
        
    }
}

module.exports = async function run(start, end, brand) {
    const currencies = ['cny', 'thb'];
    try {
        for(let index=0; index < currencies.length; index++) {
            let worker = await new PT({ headless: false }, currencies[index], brand);
            let dateResolver = await worker.resolveDateTime(start, end);
            await worker.init();
            await worker.login();
            await worker.gotoReport();
            for(let i=0; i < dateResolver.length; i++) {
                let start = dateResolver[i].start;
                let end = dateResolver[i].end;
                await worker.filterConditions(start, end);
                await worker.extractHtmlTable();
                await worker.resolveSource(start);
                await worker.insertIntoDB();
            }
            await worker.logout();
        }
    } catch (err) {
        console.error(err.message);
    }
};