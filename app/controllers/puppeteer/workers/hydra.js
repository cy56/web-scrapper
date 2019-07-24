const PuppeteerClient = require('./app/controllers/puppeteer/puppeteer');

class HYDRA extends PuppeteerClient {
    constructor(options, brand) {
        super(options)
        this.brand = brand
    }

    async login() {
        await this.page.on('dialog', async dialog => {
            await dialog.accept()
        })

        await this.page.goto(this.vendor.pages.login, { waitUntil: 'domcontentloaded' })
        await frame.type(this.vendor.selectors.username, this.creds.username, { delay: 100 })
        await frame.type(this.vendor.selectors.password, this.creds.password, { delay: 100 })
        await frame.select(this.vendor.selectors.brand, this.brand.toUpperCase())
        await frame.click(this.vendor.selectors.login)
    }

    async gotoReport(vendor) {
        await this.delaySeconds(5)

        let report = this.vendor.pages[vendor.toLowerCase()]
        let frame = await this.page.mainFrame()
        let frameURL = frame.childFrames()[0]._navigationURL
        let reportURL = this._url.resolve(frameURL, report)

        await this.page.goto(reportURL, { waitUntil: 'load' })
    }

    async scrap(start, end) {
        await this.scrapForSummary(start, end)
        await this.scrapForPlayer(start, end)
    }

    async scrapForSummary(start, end) {
        await this.filterForSummary(start, end)
        let file = await this.download(this.vendor.selectors.exportReport)
        let data = await this._resolver.resolveFile(file)
        await this.resolveForSummary(start, data)
    }

    async scrapForPlayer(start, end) {
        await this.filterForPlayer(start, end)
        let file = await this.download(this.vendor.selectors.exportReport)
        let data = await this._resolver.resolveFile(file)
        await this.resolveForPlayer(start, data)
    }

    async commonFilter() {
        await this.page.waitFor(this.vendor.selectors.start)
        await this.page.click(this.vendor.selectors.start, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.start, start)
        await this.page.click(this.vendor.selectors.end, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.end, end)
    }

    async filterForSummary() {
        await this.commonFilter()
    }

    async filterForPlayer() {
        await this.commonFilter()
    }

    async resolveForSummary() {

    }

    async resolveForPlayer() {

    }
}

module.exports = async function run(start, end, brand) {
    try {
        let worker = await new HYDRA({ headless: false }, brand)
        let dateResolver = await worker.resolveDateTime(start, end)
        let vendors = ['pt']
        let currencies = ['cny', 'thb']

        await worker.init()
        await worker.login()

        for (let i = 0; i < dateResolver.length; i++) {
            for (let vendor of vendors) {
                let start = dateResolver[i].start
                let end = dateResolver[i].end
                await worker.gotoReport(vendor)
                await worker.scrap(start, end)
            }
        }

        await worker.logout()

    } catch (err) {
        console.error(err)
    }
};