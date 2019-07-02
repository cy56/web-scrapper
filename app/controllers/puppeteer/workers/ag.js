const PuppeteerClient = require('../base');

class AG extends PuppeteerClient {
    constructor(options = {}, account, brand) {
        super(options);
        this.brand = brand;
        this.platform = account.toLowerCase();
    }
    
    async loginProcess() {
        await this.page.goto(this.vendor.pages.login, { waitUntil:'load', timeout:60000 });
        await this.page.waitFor(this.vendor.selectors.login, {visible:true});
        await this.page.type(this.vendor.selectors.username, this.creds[this.platform].username, { delay: 100 });
        await this.page.type(this.vendor.selectors.password, this.creds[this.platform].password, { delay: 100 });
        await this.page.click(this.vendor.selectors.login);
    }

    async gotoReportProcess() {
        await this.page.goto(this.vendor.pages.report);
        if(this.platform.toLowerCase() === 'ag') {
            await this.page.click(this.vendor.selectors.hunter);
        }
    }

    async filterConditionsProcess(start, end) {
        const runReport = this.vendor.selectors[this.platform].runReport;
        await this.page.waitFor(this.vendor.selectors[this.platform].runReport, { visible:true });
        await this.page.click(this.vendor.selectors[this.platform].start, { clickCount: 3});
        await this.page.type(this.vendor.selectors[this.platform].start, start);
        await this.page.click(this.vendor.selectors[this.platform].end, { clickCount: 3 });
        await this.page.type(this.vendor.selectors[this.platform].end, end);
        await this.page.evaluate((runReport) => {
            document.querySelector(runReport).click();
        }, runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors[this.platform].table;
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                let tmp = table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
                if (tmp[0] !== 'Total(CNY)') {
                    items.push(tmp);
                }
            }
            return items;
        }, htmlTable);
    }

    async logoutProcess() {
        await this.page.waitFor(this.vendor.selectors.logout, {visible: true});
        await this.page.click(this.vendor.selectors.logout);
        await this.page.waitFor(this.vendor.selectors.logoutConfirm, {visible: true});
        await this.page.click(this.vendor.selectors.logoutConfirm);
    }
}

module.exports = async function run(start, end, brand) {
    const accounts = ['agl', 'ag'];
    try {
        for (let index = 0; index < accounts.length; index++) {
            let worker = new AG({ headless: false }, accounts[index], brand);
            let dateResolver = await worker.resolveDateTime(start, end);
            await worker.init();
            await worker.login();
            await worker.gotoReport();
            for (let i = 0; i < dateResolver.length; i++) {
                let start = dateResolver[i].start;
                let end = dateResolver[i].end;
                await worker.filterConditions(start, end);
                await worker.extractHtmlTable();
                await worker.resolveSource(start);
                await worker.insertIntoDB();
            }
            await worker.logout();
        }
    } catch(err) {
        console.error(err.message);
    }
}