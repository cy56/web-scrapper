const puppeteer = require('puppeteer');
const dbc = require('./dbc');
const dateresolver = require('./dateresolver');
const libDate = require('date-and-time');
const path = require('path');
const fs = require('fs');
const mailer = require('./mailer');
const mConfig = require('./configs/mailer');

class PuppeteerClient {
    constructor(options = {}) {
        this.headless = options.headless;
        this.args = options.args || [];
        this.slowMo = this.headless === false ? 100 : 500;

        this.dbc = dbc;

        this.browser = null;
        this.page = null;

        this.creds = require(`../creds/${this.toString()}`);
        this.vendor = require(`../libs/${this.toString()}`);
        this.parser = require(`../parsers/${this.toString()}`);
        this.model = require(`../models/vendors/${this.toString()}`);
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
            this.resolved = await this.resolveParser(source, this.toString(), this.filename, date, this.unresolved, this.parser);
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

    async resolveParser(source, vendor, filename, startDate, unresolved, parser) {
        let items = [];
        for (let index = 0; index < unresolved.length; index++) {
            const date = libDate.format(new Date(startDate), 'YYYY-MM-DD');
            const newParser = new parser({ source, vendor, filename, date}, unresolved[index]);
            items.push(newParser.getResults());
        }
        return items;
    }

    async resolveCaptcha(b64Captcha, timeout = 60, type = null) {
        return new Promise((resolve, reject) => {
            const resolver = new dbc;
            if (!resolver) {
                reject('failed to connect captcha api');
            }
            const result = resolver.decode({ captcha: b64Captcha, timeout: timeout });
            if (!result) {
                reject(result);
            } else {
                resolve(result);
            }
        });
    }

    async reportCaptcha(captcha) {
        return new Promise((resolve, reject) => {
            const resolver = new dbc;
            if (!resolver) {
                reject('failed to connect captcha api');
            }
            const result = resolver.report(captcha);
            resolve(result);
        });
    }

    async takeScreenshot(used = 'products') {
        const timer = await Date.parse(libDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
        const filename = `${timer}.png`;
        const directory = path.join(__dirname, `../storages/images/${used}/${this.constructor.name}/`);
        fs.exists(directory, (exists) => {
            if (!exists) {
                fs.mkdir(directory, { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }
        });
        const tmpPath = `${directory}${filename}`;
        await this.page.screenshot({ path: tmpPath, fullPage: true });
        return filename;
    }

    async reportError(func, err) {
        let errMsg = await this.getErrorMsg(func, err.message);
        console.error(errMsg);
        //await this.reportByEmail(errMsg);
        await this.takeScreenshot('error');
        if(func === 'login') {
            await this.endProcess();
        } else {
            await this.logout();
        }
    }

    async reportByEmail(err) {
        const service = new mailer();
        await service.send({ mail: mConfig.username, subject: mConfig.subject, text: err });
    }

    resolveDateTime(start, end) {
        return new dateresolver({ vendor: this.toString(), start: start, end: end }).getResult();
    }

    getErrorMsg(func, err) {
        return `${this.toString()}|${func}=>${err}`;
    }

    endProcess() {
        process.exit(1);
    }

    clearItems() {
        this.resolved.length = 0;
        this.unresolved.length = 0;
    }

    toString() {
        return this.constructor.name.toLowerCase();
    }
}

module.exports = PuppeteerClient