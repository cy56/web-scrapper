const puppeteer = require('puppeteer');
const db = require('../../config/db');

class PuppeteerClient {
    constructor(options = {}) {
        // Setup
        this.headless = options.headless;
        this.args = options.args || [];
        this.slowMo = this.headless === false ? 100 : 500;

        // // Setup Properties
        this.browser = null;
        this.page = null;
        this.vendor = require(`./jobs/extensions/${this.toString()}`);
        this.creds = require(`./jobs/credentials/${this.toString()}`);
        this.model = db[this.toString().toLowerCase()];
        
        // // Setup Services
        this._dbc = require('../system/dbc');
        this._mailer = require('../system/mailer');
        this._resolver = require('../system/resolver');
    }

    async init() {
        try {
            this.browser = await puppeteer.launch({
                headless: this.headless,
                ignoreHTTPSErrors: true,
                slowMo: this.slowMo,
                args: this.args
            })
            this.page = await this.browser.newPage();
        } catch (err) {
            this.reportError('init', err);
        }
    }

    async login() {
        try {
            await this.loginProcess();
        } catch (err) {
            this.reportError('login', err);
        }
    }

    async gotoReport() {
        try {
            this.page.waitFor(10000);
            await this.gotoReportProcess();
        } catch (err) {
            this.reportError('gotoReport', err);
        }
    }

    async filterConditions(start, end) {
        try {
            this.page.waitFor(5000);
            await this.filterConditionsProcess(start, end);
        } catch (err) {
            this.reportError('filterConditions', err);
        }
    }

    async extractHtmlTable() {
        try {
            await this.page.waitFor(10000);
            this.filename = await this.takeScreenshot();
            this.unresolved = await this.extractHtmlTableProcess();
        } catch (err) {
            this.reportError('extractHtmlTable', err);
        }
    }

    async resolveSource(date) {
        try {
            this.page.waitFor(3000);
            const source = (this.toString() !== 'hydra') ? 'vendor' : 'hydra';
            const vendor = this.toString();
            const brand = this.brand.toUpperCase() || 'RB88';
            const currency = this.currency || null;
            const filename = this.filename;
            this.resolved = await this._resolver.resolveParser({ source, brand, vendor, filename, date, currency }, this.unresolved);
        } catch (err) {
            this.reportError('resolveSource', err);
        }
    }

    async insertIntoDB() {
        try {
            this.page.waitFor(5000);
            if (Array.isArray(this.resolved)) {
                await this.model.createMany(this.resolved);
            } else {
                await this.model.createOne(this.resolved);
            }
            this.clearItems();
        } catch (err) {
            this.reportError('insertIntoDB', err);
        }
    }

    async logout() {
        try {
            await this.logoutProcess();
            await this.close();
        } catch (err) {
            this.reportError('logout', err);
        }
    }

    async close() {
        await this.page.waitFor(2000);
        await this.browser.close();
    }

    resolveDateTime(start, end) {
        return this._resolver.resolveVendorDates({ vendor: this.toString(), start, end});
    }

    clearItems() {
        this.resolved.length = 0;
        this.unresolved.length = 0;
    }

    endProcess() {
        process.exit(1);
    }

    async reportError(func, err) {
        let errMsg = `${func}: ${err.message}`;
        console.error(errMsg);
        //await this.reportByEmail(errMsg);
        await this.takeScreenshot('error');
        if (func === 'login') {
            await this.endProcess();
        } else {
            await this.logout();
            await this.endProcess();
        }
    }

    async resolveCaptcha(b64Captcha, timeout = 60, type = null) {
        return new Promise((resolve, reject) => {
            const result = this._dbc.decode({ captcha: b64Captcha, timeout: timeout });
            if (!result) {
                reject(result);
            } else {
                resolve(result);
            }
        });
    }

    async reportCaptcha(captcha) {
        return new Promise((resolve, reject) => {
            const result = this._dbc.report(captcha);
            resolve(result);
        });
    }

    async takeScreenshot(used = 'products') {
        const screenshot = this._resolver.resolvePath({ type: used, vendor: this.toString() });
        //await this.page.screenshot({ file: screenshot.tmpPath, fullPage: true });
        return screenshot.filename;
    }

    async reportByEmail(err) {
        await this._mailer.send({ mail: 'lim.cy@nettium.net', subject: 'WebScrapper System Error', text: err });
    }

    toString() {
        return this.constructor.name;
    }
}

module.exports = PuppeteerClient