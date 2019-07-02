const PuppeteerClient = require('../base');

class BETTRADE extends PuppeteerClient {
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.waitFor(this.vendor.selectors.username, {visible:true});
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
        const report = this.vendor.selectors.report;
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true });
        await this.page.evaluate((report) => {
            document.querySelector(report).click();
        }, report);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            start: this.vendor.selectors.start,
            end: this.vendor.selectors.end,
            member: this.vendor.selectors.member,
            currency: this.vendor.selectors.currency
        }
        await this.page.waitFor(this.vendor.selectors.start, { visible: true });
        await this.page.evaluate((filters, start, end) => {
            document.querySelector(filters.start).value = start;
            document.querySelector(filters.end).value = end;
            if(!document.querySelector(filters.member).checked) {
                document.querySelector(filters.member).click();
                document.querySelector(filters.currency).click();
            }
        }, filters, start, end);
        await this.page.waitFor(2000);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable) => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                items.push(table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t'));
            }
            return items;
        }, htmlTable);    
    }

    async logoutProcess() {
        const logout = this.vendor.selectors.logout;
        await this.page.waitFor(3000);
        await this.page.evaluate((logout) => {
            document.querySelector(logout).click();
        }, logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new BETTRADE({ headless: false }, brand);
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