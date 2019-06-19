const PuppeteerClient = require('../base');

class GEN extends PuppeteerClient {
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.login);
        await this.page.type(this.vendor.selectors.username, this.creds.username);
        await this.page.type(this.vendor.selectors.password, this.creds.password);
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.report);
        await this.page.click(this.vendor.selectors.report);
        await this.page.waitFor(this.vendor.selectors.gameReport);
        await this.page.click(this.vendor.selectors.gameReport);
    }

    async filterConditions(start, end, fCurrency) {
        const filters = {
            currency: this.vendor.selectors.filterCurrency,
            betCurrency: this.vendor.selectors.filterBetCurrency,
            viewBy: this.vendor.selectors.filterViewBy,
            list: this.vendor.selectors.filterList,
            fCurrency: fCurrency,
            vView: 'Currency',
            report: this.vendor.selectors.runReport
        }
        await this.page.waitFor(filters.currency, { visible: true });
        await this.page.evaluate((filters) => {
            document.querySelector(filters.currency).click();
            document.querySelector(filters.viewBy).click();
            let lists = document.querySelectorAll(filters.list);
            for (let index = 0; index < lists.length; index++) {
                if (lists[index].outerText === filters.vView) {
                    lists[index].click();
                }
            }
            lists = [];
            document.querySelector(filters.betCurrency).click();
            lists = document.querySelectorAll(filters.list);
            for (let index = 0; index < lists.length; index++) {
                if (lists[index].outerText === filters.fCurrency) {
                    lists[index].click();
                }
            }
        }, filters);

        await this.page.click(this.vendor.selectors.startDate);
        await this.page.click(this.vendor.selectors.dateValue, { clickCount : 3 });
        await this.page.type(this.vendor.selectors.dateValue, start);
        await this.page.click(this.vendor.selectors.endDate);
        await this.page.waitFor(this.vendor.selectors.dateValue);
        await this.page.click(this.vendor.selectors.dateValue, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.dateValue, end);
        await this.page.waitFor(2000);
        await this.page.evaluate((filters) => { 
            document.querySelector(filters.report).click();
        }, filters);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable) => {
                let items = [];
                const table = document.querySelectorAll(htmlTable);
                for (let index = 0; index < table.length; index++) {
                    const item = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                    if (item[0] !== 'Subtotal' && item[0] !== 'Total') {
                        items.push(item);
                    }     
                }
                return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.profile, {visible:true});
        await this.page.click(this.vendor.selectors.profile);
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const currencies = ['CNY', 'THB'];
    const worker = new GEN({ headless: false }, brand);
    const dateResolver = worker.resolveDateTime(start, end); 
    
    try {
        await worker.init();
        await worker.login();
        await worker.gotoReport();
        for (let i = 0; i < dateResolver.length; i++) {
            let start = dateResolver[i].start;
            let end = dateResolver[i].end;
            for(let index=0; index < currencies.length; index++) {
                let currency = currencies[index];
                await worker.filterConditions(start, end, currency);
                await worker.extractHtmlTable();
                await worker.resolveSource(start);
                await worker.insertIntoDB();
            }
        }
        await worker.logout();
    } catch (err) {
        console.error(err.message);
    }
}