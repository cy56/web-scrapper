const PuppeteerClient = require('../services/puppeteer');

class SPG extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.merchant, this.creds.merchant);
        await this.page.type(this.vendor.selectors.username, this.creds.username);
        await this.page.type(this.vendor.selectors.password, this.creds.password);
        let validate = await this.page.$(this.vendor.selectors.captcha);
        let b64Captcha = await validate.screenshot({ encoding: 'base64' });
        await this.resolveCaptcha(b64Captcha).then(async (captcha) => {
            await this.page.type(this.vendor.selectors.validation, captcha['text']);
            await this.page.click(this.vendor.selectors.login);
        });
    }

    async gotoReportProcess() {
        await this.page.waitFor(this.vendor.selectors.report, { visible: true });
        await this.page.click(this.vendor.selectors.report);
    }

    async filterConditionsProcess(start, end) {
        await this.page.waitFor(this.vendor.selectors.runReport, { visible: true });
        await this.page.select(this.vendor.selectors.filterType, '2');
        await this.page.select(this.vendor.selectors.filterDate, 'period');
        await this.page.click(this.vendor.selectors.start, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.start, start);
        await this.page.click(this.vendor.selectors.end, { clickCount: 3 });
        await this.page.type(this.vendor.selectors.end, end);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        await this.page.waitFor(3000);
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                let tmp = table[index].outerText.split('\t');
                if (tmp[0] != 'Total') {
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
    const worker = new SPG({ headless: false });
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