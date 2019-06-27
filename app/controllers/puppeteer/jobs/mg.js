const PuppeteerClient = require('../base');

class MG extends PuppeteerClient {

    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
        this.first = true;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login, { waitUntil: 'load', timeout: 0 });
        await this.page.waitFor(this.vendor.selectors.username, {visible:true});
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 50 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 50 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(10000);
        await this.page.goto(this.vendor.pages.report, { waitUntil: 'load', timeout: 0 });
    }

    async filterConditionsProcess(start, end) {
        if(this.first) {
            await this.page.waitFor(this.vendor.selectors.reportCasinoProfit, {visible:true});
            await this.page.click(this.vendor.selectors.reportCasinoProfit);
            await this.page.waitFor(5000);
            await this.page.click(this.vendor.selectors.dateFilter);
            await this.page.click(this.vendor.selectors.dateBetween);
            await this.page.click(this.vendor.selectors.extraFilter);
            await this.page.click(this.vendor.selectors.registerCasino);
            await this.page.click(this.vendor.selectors.base);
            await this.page.click(this.vendor.selectors.filRegister);
            await this.page.waitFor(2000);
            await this.page.click(this.vendor.selectors.filRegisterVal);
            await this.page.click(this.vendor.selectors.base);
            await this.page.click(this.vendor.selectors.colCustomize);
            await this.page.click(this.vendor.selectors.colCountry);
            await this.page.click(this.vendor.selectors.colLanguage);
        }
        this.first = false;
        await this.page.focus(this.vendor.selectors.dateStart);
        await this.page.click(this.vendor.selectors.dateStart, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.dateStart, start);
        await this.page.focus(this.vendor.selectors.dateEnd);
        await this.page.click(this.vendor.selectors.dateEnd, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.dateEnd, end);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        await this.page.waitFor(this.vendor.selectors.table, { visible: true, timeout:60000 });
        const htmlTable = this.vendor.selectors.table;
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
        await this.page.waitFor(this.vendor.selectors.mainMenu, {visible:true});
        await this.page.click(this.vendor.selectors.mainMenu);
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new MG({ headless: false }, brand);
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
};