const PuppeteerClient = require('../../services/puppeteer');

class TGP extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.licensee, { visible: true });
        await this.page.focus(this.vendor.selectors.licensee);
        await this.page.type(this.vendor.selectors.licensee, this.creds.licensee, { delay: 10 });
        await this.page.focus(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username, { delay: 10 });
        await this.page.focus(this.vendor.selectors.password);
        await this.page.type(this.vendor.selectors.password, this.creds.password, { delay: 10 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.profile, { visible: true });
        await this.page.click(this.vendor.selectors.report);
        await this.page.waitFor(this.vendor.selectors.overallReport, { visible: true });
        await this.page.click(this.vendor.selectors.overallReport);
    }

    async filterConditionsProcess(start, end) {
        const fitlers = {
            start: this.vendor.selectors.startDate,
            end: this.vendor.selectors.endDate
        }
        await this.page.waitFor(this.vendor.selectors.startDate, { visible: true });
        await this.page.evaluate((fitlers) => {
            document.querySelector(fitlers.start).value = '';
            document.querySelector(fitlers.end).value = '';
        }, fitlers);
        await this.page.focus(this.vendor.selectors.startDate);
        await this.page.type(this.vendor.selectors.startDate, start, { delay: 10 });
        await this.page.focus(this.vendor.selectors.endDate);
        await this.page.type(this.vendor.selectors.endDate, end, { delay: 10 });
        await this.page.select(this.vendor.selectors.endTime, 'string:23')
        await this.page.click(this.vendor.selectors.search);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(10000);
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                const item = table[index].outerText.split('\t');
                if(item[1] == 'Fun88Prod') {
                    items.push(item);
                }
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        const logout = {
            profile: this.vendor.selectors.profile,
            logout: this.vendor.selectors.logout
        }
        await this.page.evaluate((logout) => {
            document.querySelector(logout.profile).click();
            document.querySelector(logout.logout).click();
        }, logout);
    }
}

module.exports = async function run(start, end) {
    const worker = new TGP({ headless: false });
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