const PuppeteerClient = require('../base');

class SBT extends PuppeteerClient {
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
        this.first = true;
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
        await this.page.waitFor(5000);
        await this.page.goto(this.vendor.pages.report, { timeout: 0, waitUntil: 'load' });
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            dateRange: this.vendor.selectors.filterDateRange,
            operator: this.vendor.selectors.filterOperator,
            currency: this.vendor.selectors.filterCurrency,
            groupByType: this.vendor.selectors.filterGroupByType,
            groupBy: this.vendor.selectors.filterGroupBy,
            groupByOperator: this.vendor.selectors.filterGroupByOperator
        }
        await this.page.waitFor(this.vendor.selectors.runReport, { visible: true });
        if(this.first) {
            await this.page.evaluate((filters) => {
                document.querySelector(filters.dateRange).click();
            }, filters);
            await this.page.waitFor(1000);
            await this.page.evaluate((filters) => {
                document.querySelector(filters.operator).click();
            }, filters);
            await this.page.waitFor(1000);
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
            await this.page.evaluate((filters) => {
                document.querySelector(filters.groupByOperator).click();
            }, filters);
            await this.page.click(this.vendor.selectors.filterUniquePlayer);
            await this.page.waitFor(3000);
        }  
        await this.page.click(this.vendor.selectors.filterStartDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.filterStartDate, start);
        await this.page.click(this.vendor.selectors.filterEndDate, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.filterEndDate, end);
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
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.click(this.vendor.selectors.logout);
        await this.page.click(this.vendor.selectors.confirmLogout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new SBT({ headless: false }, brand);
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