const PuppeteerClient = require('../services/puppeteer');

class AG extends PuppeteerClient {
    constructor(options = {}) {
        super(options);
    }

    async login(account='live') {
        try {
            await this.page.goto(vendor.pages.login);
            await this.page.waitFor(vendor.selectors.login, {visible:true});
            await this.page.type(vendor.selectors.username, creds[account].username);
            await this.page.type(vendor.selectors.password, creds[account].password);
            let validate = await this.page.$(vendor.selectors.captcha);
            let b64Captcha = await validate.screenshot({ encoding: 'base64' });
            await this.resolveCaptcha(b64Captcha).then(async (captcha) => {
                await this.page.type(vendor.selectors.validation, captcha['text']);
                await this.page.click(vendor.selectors.login);
            });
        } catch (err) {
            console.error('AG login:', err.message);
        }
    }

    async gotoReport() {
        try {
            await this.page.waitFor(vendor.selectors.logout, {visible:true});
            await this.page.click(vendor.selectors.report);
        } catch (err) {
            console.log('AG gotoReport', err.message);
        }
    }

    async filterConditions(type='live', start, end) {
        try {
            if(type === 'live') {
                return this.filterForLive(start, end);
            } else {
                return this.filterForHunter(start, end);
            }
        } catch (err) {
            console.log('AG filterConditions', err.message);
        }
    }

    async filterForHunter(start, end) {
        await this.page.waitFor(vendor.selectors.hunter.runReport, { visible: true });
        await this.page.evaluate((vendor) => {
            document.querySelector(vendor.selectors.hunter.start).removeAttribute('readonly');
            document.querySelector(vendor.selectors.hunter.end).removeAttribute('readonly');
            document.querySelector(vendor.selectors.hunter.start).value = '';
            document.querySelector(vendor.selectors.hunter.end).value = '';
        }, vendor);
        await this.page.type(vendor.selectors.hunter.start, start);
        await this.page.type(vendor.selectors.hunter.end, end);
        await this.page.click(vendor.selectors.hunter.runReport);
    }

    async filterForLive(start, end) {
        await this.page.waitFor(vendor.selectors.live.runReport, { visible: true });
        await this.page.evaluate((vendor) => {
            document.querySelector(vendor.selectors.live.start).removeAttribute('readonly');
            document.querySelector(vendor.selectors.live.end).removeAttribute('readonly');
            document.querySelector(vendor.selectors.live.start).value = '';
            document.querySelector(vendor.selectors.live.end).value = '';
        }, vendor);
        await this.page.type(vendor.selectors.live.start, start);
        await this.page.type(vendor.selectors.live.end, end);
        await this.page.click(vendor.selectors.live.runReport);
    }

    async extractHtmlTable(type='live') {
        try {
            
        } catch (err) {
            console.log('AG extractHtmlTable', err.message);
        }
    }

    async extractForHunter() {
        await this.page.waitFor(3000);
        this.unresolved = await this.page.evaluate((vendor) => {
            const table = document.querySelectorAll(vendor.selectors.hunter.table);
            return table[table.length - 1].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t');
        }, vendor);
    }

    async extractForLive() {
        await this.page.waitFor(3000);
        this.unresolved = await this.page.evaluate((vendor) => {
            let items = [];
            const table = document.querySelectorAll(vendor.selectors.live.table);
            for (let index = 0; index < table.length; index++) {
                items.push(table[index].outerText.replace(/(\r\n|\n|\r)/gm, "").split('\t'));
            }
            return items;
        }, vendor);
    }

    async resolveSource(type='live') {
        try {
            if(type === 'live') {
                this.resolveForLive();
            } else {
                this.resolveForHunter();
            }   
        } catch (err) {
            console.log('AG resolveSource', err.message);
        }
    }

    async resolveForHunter() {

    }

    async resolveForLive() {

    }

    async insertIntoDB(type='live') {
        try {
            if(type === 'live') {
                this.insertForLive();        
            } else {
                this.insertForHunter();
            }
        } catch (err) {
            console.log('AG insertIntoDB', err.message);
        }
    }

    async insertForHunter() {

    }

    async insertForLive() {

    }

    async logout() {
        try {

        } catch (err) {
            console.log('AG logout', err.message);
        }
    }
}

module.exports = async function run(start, end) {
    const worker = new AG({ headless: false }, start, end);
    await worker.init();
    await worker.login(account='live');
    //await worker.gotoReport();
    //await worker.filterConditions(start, end);
    //await worker.extractHtmlTable();
    //await worker.resolveSource();
    //await worker.insertIntoDB();
    //await worker.logout();
    return 'Task Done!!!';
}