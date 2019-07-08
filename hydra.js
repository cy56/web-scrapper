const puppeteer = require('puppeteer');

const run = async () => {
    const browser = await puppeteer.launch({ headless: false });
    try {
        const page = await browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 800
        });

        await login(page);
        await gotoReport(page);

    } catch(e) {
        console.log(e.message);
    }
}

const login = async(page) => {
    await page.goto(
        'http://backoffice.staging.luckystar188.biz/',
        { waitUntil: 'domcontentloaded' },
    );

    await page.waitFor(10000);

    let frame = await loginFrame(page);

    await frame.type('#txtUserName', 'welton', { delay: 100 });
    await frame.type('#txtPassword', 'Password1234', { delay: 100 });
    await frame.select('#DdlBrands', 'RB88');
    await frame.click('input[name="btnLogin"]');
}

const gotoReport = async(page) => {
    await page.waitFor(10000);
    let frame = await page.mainFrame();
    let doc = await frame.evaluate(() => {
        let mainFrame = window.document.documentElement.querySelector('frame').contentDocument;
        let headerFrame = mainFrame.querySelector('#frHeader').contentDocument;
        headerFrame.querySelector('#key44').click();
    });

    console.log(doc);
}

const loginFrame = async(page) => {
    let frames = await page.frames();
    return frames[1];
}

const headerFrame = async(page) => {
    let frames = await page.frames();
    return frames[0];
}

run();
 