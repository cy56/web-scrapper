const puppeteer = require('puppeteer')
const url = require('url')

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
        await gotoReport(page, downloadCallback)

    } catch(e) {
        console.error(e.message)
    }
}

const login = async(page) => {
    await page.goto(
        '',
        { waitUntil: 'domcontentloaded' },
    );

    await page.waitFor(10000)

    let frame = await loginFrame(page)
    
    await frame.type('#txtUserName', 'welton', { delay: 100 })
    await frame.type('#txtPassword', 'Password1234', { delay: 100 })
    await frame.select('#DdlBrands', 'RB88')
    await frame.click('input[name="btnLogin"]')
}

const gotoReport = async(page, callback) => {
    await page.waitFor(10000)
    let frame = await page.mainFrame()
    let doc = await frame.evaluate(() => {
        let mainFrame = window.document.documentElement.querySelector('frame').contentDocument
        let headerFrame = mainFrame.querySelector('#frHeader').contentDocument
        headerFrame.querySelector('#key44').click()
    })
    await page.waitFor(3000)
    await callback(page)
}

const downloadCallback = async(page, start, end) => {
    let report = 'ReportWinLoss/PTWinLoss.aspx?menuid=700'
    let frame = await mainFrame(page)
    let frameURL = frame.childFrames()[0]._navigationURL
    let reportURL = url.resolve(frameURL, report)

    await page.goto(reportURL, { waitUntil: 'load' })
    await page.waitFor('#ctl00_content_txtDateFrom')
    await page.click('#ctl00_content_txtDateFrom', { clickCount: 3 })
    await page.type('#ctl00_content_txtDateFrom', start)
    await page.click('#ctl00_content_txtDateTo', { clickCount: 3 })
    await page.type('#ctl00_content_txtDateTo', end)
    await page.click('#ctl00_content_btnExportCSV')
}

const loginFrame = async(page) => {
    let frames = await page.frames()
    return frames[1]
}

const mainFrame = async(page) => {
    return page.mainFrame()
}

run();
 