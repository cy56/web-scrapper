const puppeteer = require('puppeteer');
const db = require('../../services/database');
const dbc = require('../../services/dbc');
const mailer = require('../../services/mailer');
const resolver = require('../../services/resolver');
const path = require('path');
const util = require('util');

class PuppeteerClient {
    constructor(options = {}) {
        // Setup Puppeteer
        this.headless = options.headless;
        this.args = options.args || ['--window-size=1920,1080'];
        this.slowMo = this.headless === false ? 100 : 500;

        // Setup Services
        this._dbc = new dbc();
        this._mailer = new mailer();
        this._resolver = resolver;

        // Setup Properties
        this.browser = null;
        this.page = null;
        this.source = (this.toString() !== 'hydra') ? 'vendor' : 'hydra';
        this.platform = this.toString();
        this.vendor = require(`./jobs/extensions/${this.toString().toLowerCase()}`);
        this.creds = this.vendor.auths;
    }

    async init() {
        try {
            this.browser = await this.getBrowser();
            this.page = await this.getPage();
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
            await this.page.waitFor(10000);
            await this.gotoReportProcess();
        } catch (err) {
            this.reportError('gotoReport', err);
        }
    }

    async filterConditions(start, end) {
        try {
            await this.page.waitFor(5000);
            await this.filterConditionsProcess(start, end);
        } catch (err) {
            this.reportError('filterConditions', err);
        }
    }

    async exportFile(f) {
        const downloadPath = path.join(__dirname, `../../storages/csv`);

        await this.page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath,
        });

        await f();

        console.error('Downloading...');
        let fileName;
        while (!fileName || fileName.endsWith('.crdownload')) {
            await new Promise(resolve => setTimeout(resolve, 100));
            [fileName] = await util.promisify(fs.readdir)(downloadPath);
        }

        const filePath = path.resolve(downloadPath, fileName);
        console.error('Downloaded file:', filePath);
        return filePath;
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
            this.page.waitFor(5000);
            const source = this.source;
            const vendor = this.platform;
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
            const model = db[this.platform.toLowerCase()];
            this.page.waitFor(5000);
            if (Array.isArray(this.resolved)) {
                await model.createMany(this.resolved);
            } else {
                await model.createOne(this.resolved);
            }
            this.clearItems();
        } catch (err) {
            this.reportError('insertIntoDB', err);
        }
    }

    async logout() {
        try {
            await this.page.waitFor(3000);
            await this.logoutProcess();
            await this.close();
        } catch (err) {
            this.reportError('logout', err);
        }
    }

    async close() {
        await this.page.waitFor(5000);
        await this.browser.close();
    }

    async reportError(func, err) {
        let errMsg = `${func}: ${err.message}`;
        console.error(errMsg);
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

    async takeScreenshot() {
        const screenshot = this._resolver.resolvePath({ vendor: this.toString() });
        await this.page.screenshot({ file: screenshot.tmpPath, fullPage: true });
        return screenshot.filename;
    }

    getBrowser() {
        return puppeteer.launch({
            headless: this.headless,
            ignoreHTTPSErrors: true,
            defaultViewport: { height: 900, width: 1440 },
            slowMo: this.slowMo,
            args: this.args
        })
    }

    getPage() {
        return this.browser.newPage();
    }

    resolveDateTime(start, end) {
        return this._resolver.resolveVendorDates({ vendor: this.toString(), start, end });
    }

    clearItems() {
        this.resolved.length = 0;
        this.unresolved.length = 0;
    }

    endProcess() {
        process.exit(1);
    }

    toString() {
        return this.constructor.name;
    }
}

module.exports = PuppeteerClient