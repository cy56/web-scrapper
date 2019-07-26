const fs = require('fs')
const util = require('util')
const path = require('path')
const _ = require('lodash')
const date = require('../services/date')

const fsExists = util.promisify(fs.exists)
const fsMkDir = util.promisify(fs.mkdir)
const fsWriteFile = util.promisify(fs.writeFile);

class Storage {

    static async mkdir(directory = null) {

        const filepath = (_.isNull(directory)) ? path.join(__dirname, '../storages/tmp') : path.join(__dirname, `../storages/${directory}`)

        let fileExists = await fsExists(filepath)

        if (fileExists) {
            return filepath
        }

        await fsMkDir(filepath, { recursive: true })

        return filepath
    }

    static async touch(file = { filepath: null, filename: null, ext: null, content: null }) {
        let { filepath, filename, ext, content } = file

        if (!filepath) {
            throw 'missing filepath'
        }

        let extension = `.${ext}` || path.extname(filename)

        if (_.isEmpty(extension)) {
            throw 'the file missing extension'
        }

        if(!filename) {
            filename = `${this.generateTmpFileName()}${extension}`
        }

        let directory = await this.mkdir(filepath)

        filepath = path.join(directory, filename)

        await fsWriteFile(filepath, content)

        return { filename, filepath, extension }
    }

    static generateTmpFileName() {
        return `${date.getTimer()}`
    }
}

module.exports = Storage