const puppeteer = require('puppeteer');

class PuppeteerClient {
    constructor(options = {}) {
        // Setup
        this.headless = options.headless;
        this.args = options.args || [];
        this.slowMo = this.headless === false ? 100 : 500;

        // Setup Properties
        this.browser = null;
        this.page = null;
        this.vendor = require(`./jobs/extensions/${this.toString()}`);
        this.creds = require(`./jobs/credentials/${this.toString()}`);
        this.model = require(`../../models/vendors/${this.toString()}`);
        
        // Setup Services
        this._dbc =require('../system/dbc'),
        this._mailer =require('../system/mailer'),
        this._resolver = require('../system/resolver'),
        this._reporter = require('../system/reporter')
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
            await this.gotoReportProcess();
        } catch (err) {
            this.reportError('gotoReport', err);
        }
    }

    async filterConditions(start, end) {
        try {
            await this.filterConditionsProcess(start, end);
        } catch (err) {
            this.reportError('filterConditions', err);
        }
    }

    async extractHtmlTable() {
        try {
            this.filename = await this.takeScreenshot();
            this.unresolved = await this.extractHtmlTableProcess();
        } catch (err) {
            this.reportError('extractHtmlTable', err);
        }
    }

    async resolveSource(date) {
        try {
            const source = (this.toString() !== 'hydra') ? 'vendor' : 'hydra';
            const vendor = this.toString();
            const filename = this.filename;
            this.resolved = await this.services.resolver.resolveParser({source, vendor, filename, date}, this.unresolved);
        } catch (err) {
            this.reportError('resolveSource', err);
        }
    }

    async insertIntoDB() {
        try {
            if (Array.isArray(this.resolved)) {
                await this.model.bulkCreate(this.resolved);
            } else {
                await this.model.create(this.resolved);
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
        this.endProcess();
    }

    resolveDateTime() {
        return this._resolver.resolveVendorDates({ vendor: this.toString(), start: start, end: end });
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