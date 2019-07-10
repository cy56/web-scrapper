const library = require('adm-zip');
const path = require('path');
const fs = require('fs');
const util = require('util');

class Zipper {
    static async zip(options, files) {
        let zip = new library();
        const filename = `${options.brand}_${options.vendor}.zip`;
        const directory = path.join(__dirname, `../storages/exports/${options.brand}/${options.vendor}/`);
        const filepath = path.join(__dirname, `../storages/exports/${options.brand}/${options.vendor}/${filename}`);
        const writeZip = util.promisify(zip.writeZip);

        if (!fs.existsSync(directory)) {
            await fs.promises.mkdir(directory, { recursive: true });
        }

        for (let file of files) {
            zip.addLocalFile(file.filepath);
        }

        await writeZip(filepath);

        // for(let file of files) {
        //     fs.unlinkSync(file.filepath);
        // }

        return { filename, filepath };
    }

    static unzip(file) {
        let { extension } = file;

        if(extension === '.zip') {
            return this.unzipForZip(file);
        }

        return null;
    }

    static unzipForZip(file) {
        let { filepath } = file;
        let zip = new library(filepath);
        let zipEntries = zip.getEntries();

        let items = [];
        let directory = path.dirname(filepath);

        zipEntries.forEach(async (zipEntry) => {
            zip.extractAllTo(directory, true);
            items.push({ filename: path.join(directory, zipEntry.name) });
        });

        return items;
    }
}

module.exports = Zipper;