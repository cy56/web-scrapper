const PuppeteerClient = require('../base');

class BSG extends PuppeteerClient
{
    constructor(options = {}, brand, currency) {
        super(options);
        this.brand = brand;
        this.currency = currency;
    }

    async loginProcess() {
        await this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.goto(this.vendor.pages.login);
        await this.page.waitForSelector(this.vendor.selectors.login, {visible:true});
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 100 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.logout, {visible:true});
        await this.page.goto(this.vendor.pages.report);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            start: this.vendor.selectors.startDate,
            end: this.vendor.selectors.endDate
        }
        await this.page.waitFor(this.vendor.selectors.startDate);
        await this.page.evaluate((filters, start, end) => {
            document.querySelector(filters.start).value = start;
            document.querySelector(filters.end).value = end;
        }, filters, start, end);
        await this.page.select(this.vendor.selectors.filterCurrency, "34");
        await this.page.select(this.vendor.selectors.filterCasino, "65");
        await this.page.select(this.vendor.selectors.filterBank, "305");
        await this.page.select(this.vendor.selectors.filterAccount, "2");
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            items.push(table[1].outerText.split('\t'))
            return items;
        }, htmlTable);
    }
    
    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.logout, {visible: true});
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new BSG({ headless: false }, brand, 'cny');
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