const cron = require('node-cron')
const worker = require('./worker')
const resolver = require('./app/services/resolver')
const vendors = ['pt']
const brands = ['RB88']
const schedule = '0 0 * * MON'

class CronJob {
    static work() {
        for (let brand of brands) {
            let configs = this.getConfigs(brand)
            return worker(vendors, configs)
        }
    }

    static getConfigs(brand) {
        return {
            start: this.getDateRange().start,
            end: this.getDateRange().end,
            brand
        }
    }

    static getDateRange() {
        let today = new Date()
        let start = this.convertDateFormat(new Date(today.getFullYear(), today.getMonth(), today.getDate() -14))
        let end = this.convertDateFormat(new Date(today.getFullYear(), today.getMonth(), today.getDate() -7))
        
        return { start, end }
    }

    static convertDateFormat(date) {
        return resolver.resolveDate(date)
    }
}

cron.schedule(schedule, () => {
    const job = new CronJob()
    job.work()
})