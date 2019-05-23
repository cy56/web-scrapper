const PuppeteerClient = require('../../services/puppeteer');

class SBT extends PuppeteerClient {
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
        const report = this.vendor.selectors.report;
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.evaluate((report) => {
            document.querySelector(report).click();
        }, report);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            dateRange: this.vendor.selectors.filterDateRange,
            currency: this.vendor.selectors.filterCurrency,
            groupByType: this.vendor.selectors.filterGroupByType,
            groupBy: this.vendor.selectors.filterGroupBy
        }
        await this.page.waitFor(this.vendor.selectors.filterDateRange, {visible:true});
        await this.page.evaluate((filters) => {
            document.querySelector(filters.dateRange).click();
        }, filters);
        await this.page.waitFor(3000);
        await this.page.click(this.vendor.selectors.filterStartDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.filterStartDate, start);
        await this.page.click(this.vendor.selectors.filterEndDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.filterEndDate, end);
        await this.page.evaluate((filters) => {
            document.querySelector(filters.currency).click();
            document.querySelector(filters.groupByType).click();
            let tmp = document.querySelectorAll(filters.groupBy);
            for (let index = 0; index < tmp.length; index++) {
                if (tmp[index].innerText === 'Currency') {
                    tmp[index].click();
                }
            }
        }, filters);
        await this.page.waitFor(3000);
        // Run Report
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(5000);
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
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.click(this.vendor.selectors.logout);
        await this.page.click(this.vendor.selectors.confirmLogout);
    }
}

module.exports = async function run(start, end) {
    const worker = new SBT({ headless: false });
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