const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const util = require('util');

// set up, invoke the function, wait for the download to complete
async function download(page, f) {
    const downloadPath = path.join(__dirname, `./app/storages/downloads`);

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });

    await f();

    let filename;

    while (!filename || filename.endsWith('.crdownload')) {
        await new Promise(resolve => setTimeout(resolve, 100));
        [filename] = await util.promisify(fs.readdir)(downloadPath);
    }

    const filepath = path.resolve(downloadPath, filename);
    const extension = path.extname(filename);

    return { filename, filepath, extension };
}

// example usage
(async function () {
    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();

        await page.goto(
            'http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/',
            { waitUntil: 'domcontentloaded' },
        );
        const file = await download(page, () =>
            page.click(
                'a[href="http://eforexcel.com/wp/wp-content/uploads/2017/07/100-Sales-Records.zip"]',
            ),
        );
        
        console.log(file);

    } finally {
        await browser.close();
    }
})().catch(e => {
    console.error(e.stack);
    process.exit(1);
});