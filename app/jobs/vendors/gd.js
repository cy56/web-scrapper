const PuppeteerClient = require('../../services/puppeteer');

class GD extends PuppeteerClient
{
    constructor(options = {}) {
        super(options);
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
            console.log(window.mouse_click_button(login));
            console.log(window.mouse_click_button_up(login, window.updateLogin));
        }, loginBtn, window);
    }

    async gotoReportProcess() {
        const report = this.vendor.selectors.report;
        await this.page.waitFor(this.vendor.selectors.logout, {visible:true});
        await this.page.evaluate((report) => document.querySelector(report).click(), report);
    }

    async filterConditionsProcess(start, end) {
        await this.page.waitFor(this.vendor.selectors.runReport, {visible:true});
        await this.page.click(this.vendor.selectors.filterSpeed);
        await this.page.click(this.vendor.selectors.start, {clickCount:3});
        await this.page.type(this.vendor.selectors.start, start);
        await this.page.click(this.vendor.selectors.end, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.end, end);
        //await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(5000);
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                const tmp = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                if(tmp[0].length > 1 && tmp.length === 13) {
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

module.exports = async function run(start, end) {
    const worker = new GD({headless:false});
    const dateResolver = worker.resolveDateTime(start, end);
    try {
        await worker.init();
        await worker.login();
        // await worker.gotoReport();
        // for (let index = 0; index < dateResolver.dates.length; index++) {
        //     const start = dateResolver.dates[index].start;
        //     const end = dateResolver.dates[index].end;
        //     await worker.filterConditions(start, end);
        //     await worker.extractHtmlTable();
        //     await worker.resolveSource(start);
        //     await worker.insertIntoDB();
        // }
        // //await worker.logout();
        return 'Task Done!!!';
    } catch (err) {
        console.error(err.message);
    }
};