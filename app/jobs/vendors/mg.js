const PuppeteerClient = require('../../services/puppeteer');

class MG extends PuppeteerClient
{
    constructor(options = {}) {
        super(options);
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.username, {visible:true});
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 50 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 50 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.pages.report, {visible:true});
        await this.page.click(this.vendor.pages.report);
        await this.page.waitFor(this.vendor.selectors.report);
        await this.page.click(this.vendor.pages.reportCasinoProfit);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            start: this.vendor.selectors.dateStart,
            end: this.vendor.selectors.dateEnd
        }
        await this.page.waitFor(this.vendor.selectors.reportCasinoProfit, {visible:true});
        await this.page.click(this.vendor.selectors.reportCasinoProfit);
        await this.page.click(this.vendor.selectors.dateFilter);
        await this.page.click(this.vendor.selectors.dateBetween);
        await this.page.evaluate((filters) => {
            document.querySelector(filters.start).value = '';
            document.querySelector(filters.end).value = '';
        }, filters);
        await this.page.focus(this.vendor.selectors.dateStart);
        await this.page.type(this.vendor.selectors.dateStart, start);
        await this.page.focus(this.vendor.selectors.dateEnd);
        await this.page.type(this.vendor.selectors.dateEnd, end);
        await this.page.click(this.vendor.selectors.extraFilter);
        await this.page.click(this.vendor.selectors.registerCasino);
        await this.page.click(this.vendor.selectors.filRegister);
        await this.page.click(this.vendor.selectors.filRegisterVal);
        await this.page.click(this.vendor.selectors.colCustomize);
        await this.page.click(this.vendor.selectors.colCountry);
        await this.page.click(this.vendor.selectors.colLanguage);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(10000);
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (index = 0; index < table.length; index++) {
                items.push(table[index].outerText.split('\n'));
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(vendor.selectors.logout, {visible:true});
        await this.page.click(vendor.selectors.mainMenu);
        await this.page.click(vendor.selectors.logout);
    }
}

module.exports = async function run(start, end) {
    const worker = new MG({ headless: false });
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