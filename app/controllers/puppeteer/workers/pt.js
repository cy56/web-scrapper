const PuppeteerClient = require('./app/controllers/puppeteer/puppeteer');

class PT extends PuppeteerClient {
    constructor(options = {}, currency, brand) {
        super(options)
        this.currency = currency
        this.brand = brand
    }

    async loginProcess() {
        await this.page.goto(this.vendor.pages.login[this.currency])
        await this.page.waitFor(this.vendor.selectors.login, { visible: true })
        await this.page.focus(this.vendor.selectors.username)
        await this.page.type(this.vendor.selectors.username, this.creds[this.currency].username, { delay: 100 })
        await this.page.focus(this.vendor.selectors.password)
        await this.page.type(this.vendor.selectors.password, this.creds[this.currency].password, { delay: 100 })
        await this.page.click(this.vendor.selectors.login)
    }

    async gotoReportProcess() {
        await this.page.goto(this.vendor.pages.report[this.currency], { waitUntil: 'load' })
    }

    async scrap(start, end) {
        await this.scrapForSummary(start, end)
        await this.reloadPage()
        await this.scrapForPlayer(start, end)
        await this.reloadPage()
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

    async resolveForSummary(date, data) {
        const report = 'summary'
        const source = this.source
        const vendor = this.platform
        const brand = this.brand.toUpperCase() || 'RB88'
        const currency = this.currency || null
        const model = this.db[report.toLowerCase()][vendor.toLowerCase()]
        const data = new this.mapper({ source, brand, vendor, date, currency, report }, data)
        let results = data.getResult()
        await model.createMany(results)
        return true
    }

    async resolveForPlayer(date, data) {
        const report = 'player'
        const source = this.source
        const vendor = this.platform
        const brand = this.brand.toUpperCase() || 'RB88'
        const currency = this.currency || null
        const model = this.db[report.toLowerCase()][vendor.toLowerCase()]
        const data = new this.mapper({ source, brand, vendor, date, currency, report }, data)
        let results = data.getResult()
        await model.createMany(results)
        return true
    }

    async filterForSummary(start, end) {
        await this.commonFilter()
        await this.page.click(this.vendor.selectors.reportByMonthly)
        await this.page.focus(this.vendor.selectors.startDate)
        await this.page.click(this.vendor.selectors.startDate, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.startDate, start)
        await this.page.focus(this.vendor.selectors.endDate)
        await this.page.click(this.vendor.selectors.endDate, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.endDate, end)
    }

    async filterForPlayer(start, end) {
        await this.commonFilter()
        await this.page.click(this.vendor.selectors.reportByUsername)
        await this.page.focus(this.vendor.selectors.startDate)
        await this.page.click(this.vendor.selectors.startDate, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.startDate, start)
        await this.page.focus(this.vendor.selectors.endDate)
        await this.page.click(this.vendor.selectors.endDate, { clickCount: 3 })
        await this.page.type(this.vendor.selectors.endDate, end)
    }

    async commonFilter() {
        await this.page.waitFor(this.vendor.selectors.reportBoth, { visible: true })
        await this.page.click(this.vendor.selectors.reportBoth)
        await this.page.select(this.vendor.selectors.endTime, "23")
        await this.page.click(this.vendor.selectors.showProgressive)
        await this.page.click(this.vendor.selectors.showRealMoney)
        await this.page.click(this.vendor.selectors.showLiveGames)
    }

    async logoutProcess() {
        await this.page.goto(this.vendor.pages.logout[this.currency])
        await this.page.waitFor(this.vendor.selectors.logout, { visible: true })
        await this.page.click(this.vendor.selectors.logout)
    }
}

module.exports = async function run(start, end, brand) {
    const currencies = ['cny', 'thb'];
    try {
        for (let index = 0; index < currencies.length; index++) {
            let worker = await new PT({ headless: false }, currencies[index], brand)
            let dateResolver = await worker.resolveDateTime(start, end)
            await worker.init()
            await worker.login()
            await worker.gotoReport()
            for (let i = 0; i < dateResolver.length; i++) {
                let start = dateResolver[i].start
                let end = dateResolver[i].end
                await worker.scrap(start, end)
            }
            await worker.logout()
        }
    } catch (err) {
        console.error(err)
    }
};