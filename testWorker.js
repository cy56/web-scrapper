const puppeteer = require('puppeteer')
const vendor = require('./app/controllers/puppeteer/workers/extensions/cmd')
const creds = vendor.auths
const resolver = require('./app/services/resolver')

const run = async () => {
    const browser = await puppeteer.launch({ headless: false })
    try {
        const page = await browser.newPage()

        await page.setViewport({
            width: 1280,
            height: 800
        })

        await page.on('dialog', async dialog => {
            await dialog.accept()
        })

        await login(page)
        await page.waitFor(5000)
        await gotoReport(page)
        await page.waitFor(5000)
        await scrap(page)
        await page.waitFor(5000)
        await logout(page)
        browser.close()

    } catch (e) {
        console.error(e.message)
    }
}

const login = async (page) => {
    await page.goto(vendor.pages.login);
    await page.waitFor(vendor.selectors.login, { visible: true });
    await page.type(vendor.selectors.partner, creds.partner, { delay: 100 });
    await page.type(vendor.selectors.username, creds.username, { delay: 100 });
    await page.type(vendor.selectors.password, creds.password, { delay: 100 });
    await page.click(vendor.selectors.login);
}

const gotoReport = async (page) => {
    await page.goto(vendor.pages.target, { waitUntil: 'load' })
}

const scrap = async (page) => {

    //const DataFrame = require('./app/services/dataframe')
    const url = require('url')
    const pageURL = page.url()

    const liSelector = vendor.selectors.drillDownList
    let lists = await page.evaluate((liSelector) => {
        let items = []
        const liLists = document.querySelectorAll(liSelector)

        for (let liList of liLists) {
            items.push(liList.getAttribute('href'))
        }

        return items

    }, liSelector)

    for (let list of lists) {
        let table = '#tablelist'

        await page.goto(url.resolve(pageURL, list), { waitUntil: 'load' })
        await page.waitFor(3000)

        let htmlTable = await page.evaluate((table) => {
            return document.querySelector(table).outerHTML
        }, table)

        let unresolved = await convert(htmlTable, table)
        let data = unresolved.filter(obj => { return obj.hasOwnProperty('#') })

        //let df = new DataFrame(data)
        console.log(data)
        // console.log(df.renameHeader([

        // ]).getResults())
        
    }
}

const convert = async(htmlTable, selector) => {
    const jsdom = require("jsdom")
    const excel = require('./app/services/excel')
    const { JSDOM } = jsdom

    const dom = new JSDOM(htmlTable)
    const document = dom.window.document
    const table = document.querySelector(selector)

    return await excel.convertHtmlTableToCSV(table)
}

const download = async (page, buttons) => {

    const path = require('path')
    const util = require('util')
    const fs = require('fs')
    const _ = require('lodash')
    
    const downloadPath = path.join(__dirname, `./app/storages/downloads`)

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    })

    if(_.isArray(buttons)) {
        for (let button of buttons) {
            await page.click(button)
        }
    } else {
        await page.click(buttons)
    }

    let filename

    while (!filename || filename.endsWith('.crdownload')) {
        await new Promise(resolve => setTimeout(resolve, 100));
        [filename] = await util.promisify(fs.readdir)(downloadPath)
    }

    const filepath = path.resolve(downloadPath, filename)
    const extension = path.extname(filename)

    const file = { filename, filepath, extension }

    return file
}

const logout = async (page) => {
    await page.goto(vendor.pages.logout)
}

run();