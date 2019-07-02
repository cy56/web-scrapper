const _zip = require('adm-zip');
const path = require('path');

class Zipper {
    static zip() {
        throw 'function not available';
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