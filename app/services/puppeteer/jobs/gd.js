const PuppeteerClient = require('../base');

class GD extends PuppeteerClient
{
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        const loginBtn = this.vendor.selectors.login;
        await this.page.goto(this.vendor.pages.login, {waitUntil:'networkidle0'});
        await this.page.waitFor(this.vendor.selectors.login, {visible:true});
        await this.page.type(this.vendor.selectors.merchant, this.creds.partner);
        await this.page.type(this.vendor.selectors.account, this.creds.username);
        await this.page.type(this.vendor.selectors.password, this.creds.password);
        await this.page.evaluate((loginBtn) => {
            const login = document.querySelector(loginBtn);
            mouse_click_button(login);
            mouse_click_button_up(login, updateLogin);
        }, loginBtn);
    }

    async gotoReportProcess() {
        const report = this.vendor.selectors.report;
        await this.page.waitFor(this.vendor.selectors.logout, {visible:true});
        await this.page.evaluate((report) => document.querySelector(report).click(), report);
    }

    async filterConditionsProcess(start, end) {
        const runReport = this.vendor.selectors.runReport;
        await this.page.waitFor(this.vendor.selectors.runReport, { visible:true });
        await this.page.click(this.vendor.selectors.start, {clickCount:3});
        await this.page.type(this.vendor.selectors.start, start);
        await this.page.click(this.vendor.selectors.end, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.end, end);
        await this.page.evaluate((runReport) => {
            const report = document.querySelector(runReport);
            mouse_click_button(report);
            mouse_click_button_up(report, SearchSlotIntegrateWinLossReport);
        }, runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                const tmp = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                if (tmp[0] === 'Live Game') {
                    items.push(tmp);
                }
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.click(this.vendor.selectors.logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new GD({headless:false}, brand);
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