const PuppeteerClient = require('../base');

class AB extends PuppeteerClient
{
    constructor(options = {}, brand) {
        super(options);
        this.brand = brand;
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login);
        await this.page.evaluate(() => {
            changeLanguage('en_us');
        });
        await this.page.waitFor(3000);
        await this.page.waitFor(this.vendor.selectors.username);
        await this.page.type(this.vendor.selectors.username, this.creds.username);
        await this.page.type(this.vendor.selectors.password, this.creds.password);
        let validate = await this.page.$(this.vendor.selectors.captcha);
        let b64Captcha = await validate.screenshot({ encoding: 'base64' });
        await this.resolveCaptcha(b64Captcha).then(async (captcha) => {
            await this.page.type(this.vendor.selectors.validation, captcha['text']);
            await this.page.click(this.vendor.selectors.login);
            const failed = await this.page.evaluate(() => { return document.querySelector('.error span').innerText });
            if(failed !== '') {
                await this.reportCaptcha(captcha['captcha']);
                this.close();
            }
        });
    }

    async gotoReportProcess() {
        const report = this.vendor.selectors.report;
        await this.page.waitFor(this.vendor.selectors.report, { visible: true });
        await this.page.evaluate((report) => {
            document.querySelector(report).click();
        }, report);
    }

    async filterConditionsProcess(start, end) {
        const filters = {
            start: this.vendor.selectors.start,
            end: this.vendor.selectors.end
        }
        await this.page.waitFor(this.vendor.selectors.runReport, { visible: true });
        await this.page.evaluate((filters) => {
            document.querySelector(filters.start).removeAttribute('readonly');
            document.querySelector(filters.end).removeAttribute('readonly');
            document.querySelector(filters.start).value = '';
            document.querySelector(filters.end).value = '';
        }, filters);

        await this.page.type(this.vendor.selectors.start, start);
        await this.page.type(this.vendor.selectors.end, end);
        await this.page.click(this.vendor.selectors.runReport);
    }

    async extractHtmlTableProcess() {
        const htmlTable = this.vendor.selectors.table;
        return await this.page.evaluate((htmlTable => {
            let items = [];
            const table = document.querySelectorAll(htmlTable);
            for (let index = 0; index < table.length; index++) {
                const item = table[index].outerText.split('\t');
                if(item[1] == 'Client') {
                    items.push(item);
                }
            }
            return items;
        }), htmlTable);
    }

    async logoutProcess() {
        const logout = this.vendor.selectors.logout;
        await this.page.waitFor(this.vendor.selectors.logout, { visible:true });
        await this.page.evaluate((logout) => {
            document.querySelector(logout).click();
        }, logout);
    }
}

module.exports = async function run(start, end, brand) {
    const worker = new AB({ headless: false }, brand);
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