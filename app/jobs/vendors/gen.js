const PuppeteerClient = require('../../services/puppeteer');

class GEN extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
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

    async filterConditionsProcess(start, end) {
        const filters = {
            currency: this.vendor.selectors.filterCurrency,
            viewBy: this.vendor.selectors.filterViewBy,
            list: this.vendor.selectors.filterList,
            start: this.vendor.selectors.startDate,
            end: this.vendor.selectors.endDate,
            datePicker: this.vendor.selectors.datepicker,
            runReport: this.vendor.selectors.runReport,
            vCurrency: 'CNY',
            vView: 'Currency'
        }
        await this.page.waitFor(filters.currency, { visible: true });
        await this.page.evaluate((filters) => {
            document.querySelector(filters.currency).click();
            document.querySelector(filters.viewBy).click();
            const lists = document.querySelectorAll(filters.list);
            for (let index = 0; index < lists.length; index++) {
                if (lists[index].outerText === filters.vCurrency || lists[index].outerText === filters.vView) {
                    lists[index].click();
                }
            }
        }, filters);

        await this.page.evaluate((filters, start, end) => {
            document.querySelector(filters.start).click();
            let datePicker = document.querySelectorAll(filters.datepicker);
            for (let index = 0; index < datePicker.length; index++) {
                if (datePicker[index].getAttribute('title') === start) {
                    datePicker[index].click();
                }
            }
            document.querySelector(filters.end).click();
            let datePicker2 = document.querySelectorAll(filters.datepicker);
            for (let index = 0; index < datePicker2.length; index++) {
                if (datePicker2[index].getAttribute('title') === end) {
                    datePicker2[index].click();
                }
            }
        }, filters, start, end);
        await this.page.waitFor(1000);
        await this.page.click(filters.runReport);
    }

    async extractHtmlTableProcess() {
        await this.page.waitFor(3000);
        const htmlTable = this.vendor.selectors.table;

        return await this.page.evaluate((htmlTable) => {
                let items = [];
                const table = document.querySelectorAll(htmlTable);
                for (let index = 0; index < table.length; index++) {
                    const item = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                    if (item[0] !== 'Subtotal') {
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

module.exports = async function run(start, end) {
    const worker = new GEN({ headless: false });
    const dateResolver = worker.resolveDateTime(start, end);
    console.log(worker);
    // try {
    //     await worker.init();
    //     await worker.login();
    //     await worker.gotoReport();
    //     for (let index = 0; index < dateResolver.dates.length; index++) {
    //         const start = dateResolver.dates[index].start;
    //         const end = dateResolver.dates[index].end;
    //         await worker.filterConditions(start, end);
    //         await worker.extractHtmlTable();
    //         await worker.resolveSource(start);
    //         await worker.insertIntoDB();
    //     }
    //     await worker.logout();
    //     return 'Task Done!!!';
    // } catch (err) {
    //     console.error(err.message);
    // }
}