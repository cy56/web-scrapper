const library = require('dataframe-js').DataFrame
const _ = require('lodash')

class DataFrame
{
    constructor(data) {
        this.data = (_.isEmpty(data)) ? null : library(data)
    }

    where(wheres = null) {
        if (_.isNull(wheres)) {
            return this
        }

        this.data = this.data.where(wheres)

        return this
    }

    renameHeader(headers, replacement = null) {
        if (_.isEmpty(headers)) {
            return this
        }

        if(_.isArray(headers)) {
            this.data = this.data.renameAll(headers)
        }

        if(_.isString(headers)) {
            this.data = this.data.rename(replacement, headers)
        }

        return this
    }

    toCollection() {
        return this.data.toCollection()
    }
}

module.exports = DataFrame;