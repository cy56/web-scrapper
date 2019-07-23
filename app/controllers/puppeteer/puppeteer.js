const puppeteer = require('puppeteer')
const db = require('../../services/database')
const dbc = require('../../services/dbc')
const mailer = require('../../services/mailer')
const resolver = require('../../services/resolver')

class PuppeteerClient {
    constructor(options = {}) {
        // Setup Puppeteer
        this.headless = options.headless
        this.args = options.args || ['--window-size=1920,1080']
        this.slowMo = this.headless === false ? 100 : 500

        // Setup Services
        this._dbc = new dbc()
        this._mailer = new mailer()
        this._resolver = resolver
        this._db = db

        // Setup Properties
        this.browser = null;
        this.page = null;
        this.source = (this.toString() !== 'hydra') ? 'vendor' : 'hydra';
        this.platform = this.toString();
        this.vendor = require(`./workers/extensions/${this.toString().toLowerCase()}`);
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
            await this.delaySeconds(10);
            await this.gotoReportProcess();
        } catch (err) {
            this.reportError('gotoReport', err);
        }
    }

    async logout() {
        try {
            await this.delaySeconds(5);
            await this.logoutProcess();
            await this.close();
        } catch (err) {
            this.reportError('logout', err);
        }
    }

    async close() {
        await this.delaySeconds(5);
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

    async download(button) {
        const path = require('path');
        const util = require('util');
        const fs = require('fs');
        const downloadPath = path.join(__dirname, `./app/storages/downloads`);

        await this.page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath
        });

        await this.page.click(button);

        let filename;

        while (!filename || filename.endsWith('.crdownload')) {
            await new Promise(resolve => setTimeout(resolve, 100));
            [filename] = await util.promisify(fs.readdir)(downloadPath);
        }

        const filepath = path.resolve(downloadPath, filename);
        const extension = path.extname(filename);

        const file = { filename, filepath, extension };

        return file;
    }

    async takeScreenshot(date) {
        const directory = `./app/storages/images/${this.toString()}/`;
        const screenshot = this._resolver.resolvePath(directory, 'png', { date });
        await this.page.screenshot({ file: screenshot.filepath, fullPage: true });
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

    async delaySeconds(seconds = 5) {
        await this.page.waitFor(seconds*1000);
    }

    resolveDateTime(start, end) {
        return this._resolver.resolveVendorDates({ vendor: this.toString(), start, end });
    }

    async reloadPage() {
        await this.page.evaluate(() => {
            location.reload(true);
        });
        await this.delaySeconds(5);
    }

    clearItems() {
        this.resolved.length = 0;
        this.unresolved.length = 0;
    }

    endProcess() {
        process.exit(1);
    }

    setFirstToFalse() {
        this.first = false;
    }

    toString() {
        return this.constructor.name;
    }
}

module.exports = PuppeteerClient