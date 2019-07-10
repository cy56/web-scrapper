const _zip = require('adm-zip');
const path = require('path');
const fs = require('fs');

class Zipper {
    static zip(options, files) {
        const filename = `${options.brand}_${options.vendor}.zip`;
        const filepath = path.join(__dirname, `../storages/exports/${options.brand}/${options.vendor}/${filename}`);

        for (let file of files) {
            _zip.addLocalFile(file.filepath);
        }

        zipper.writeZip(filepath);

        for(let file of files) {
            fs.unlinkSync(file.filepath);
        }

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
        let zip = new _zip(filepath);
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