const PuppeteerClient = require('../../services/puppeteer');

class PGS extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitForSelector(this.vendor.selectors.login, { visible: true });
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 100 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.reportCurrency, { visible: true });
        await this.page.click(this.vendor.selectors.reportCurrency);
        await this.page.waitFor(this.vendor.selectors.reportCurrencySum, { visible: true });
        await this.page.click(this.vendor.selectors.reportCurrencySum);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            start: this.vendor.selectors.startDate,
            end: this.vendor.selectors.endDate
        };
        await this.page.waitFor(this.vendor.selectors.startDate, { visible: true });
        await this.page.evaluate((filters) => {
            document.querySelector(filters.start).removeAttribute('readonly');
            document.querySelector(filters.end).removeAttribute('readonly');
        }, filters);
        await this.page.click(this.vendor.selectors.startDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.startDate, start);
        await this.page.keyboard.press('Enter');
        await this.page.click(this.vendor.selectors.endDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.endDate, end);
        await this.page.keyboard.press('Enter');
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(3000);
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                let tmp = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                if (tmp.length > 1) {
                    items.push(tmp);
                }
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.profile, { visible: true });
        await this.page.click(this.vendor.selectors.profile);
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end) {
    const worker = new PGS({ headless: false });
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
};