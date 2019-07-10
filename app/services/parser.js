const DataFrame = require('dataframe-js').DataFrame;
const _ = require('lodash');
const _resolver = require('./resolver');
const _currency = require('./currency');

class Parser
{
    constructor(params = { brand:null, source:null, vendor:null, date:null, currency:null }, data, model = { parser:null , cast:null, skip:null, duplicate:null }) {
        let { brand, source, vendor, date, currency } = params;

        if(!brand || !source || !vendor || !date) {
            throw 'missing parameters';
        }

        if(!model.parser || !model.cast) {
            throw 'missing parser or cast in model';
        }

        this.brand = brand;
        this.source = source;
        this.vendor = vendor;
        this.date = _resolver.resolveDate(date);
        this.currency = (currency) ? currency.toLowerCase() : 'cny';
        this.data = data;
        this.model = model;
        this.df = null;
    }

    getResults() {
        try {

            // skip useless data
            if(this.model.skip) {
                this.cleanData();
            }

            if(!this.df) {
                this.df = new DataFrame(this.data, this.model.parser);
            }

            // Cast if needed
            if(this.model.cast) {
                this.castItems();
            }
        
            // Auto Wire Items (source, brand, date)
            this.autoWireItems();

            // If missing currency columns, add it
            this.patchCurrency();

            this.df = this.df.cast('currency', (val) => val.toLowerCase());

            // Skips Duplicates
            if(this.model.duplicate) {
                this.skipDuplicates();
            }

            return this.df.toCollection();

        } catch (err) {
            console.error(err.message);
        }
    }

    cleanData() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.model.skip.includes(i)) {
                delete this.data[i];
            }
        }

        if(this.model.skip.includes(-1)) {
            this.data.pop();
        }

        this.data = this.data.filter(function (el) {
            return el != null;
        });
    }

    castItems() {
        for (let item of this.model.cast) {
            let key = Object.keys(item)[0];
            let value = Object.values(item)[0];
            if (_.isNumber(value)) {
                this.df = this.df.cast(key, (val) => _currency.convert(val, value));
            } else {
                this.df = this.df.cast(key, value);
            }
        }
    }

    autoWireItems() {
        this.df = this.df.withColumn('source', () => this.source)
            .withColumn('brand', () => this.brand)
            .withColumn('date', () => this.date);
    }

    patchCurrency() {
        if (!this.df.listColumns().includes('currency')) {
            this.df = this.df.withColumn('currency', () => this.currency);
        }
    }

    skipDuplicates() {
        for (let i = 0; i < this.model.duplicate.length; i++) {
            if (!this.df.listColumns().includes[this.model.duplicate[i]]) {
                delete this.model.duplicate[i];
            }
        }

        this.model.duplicate = this.model.duplicate.filter(function (el) {
            return el != null;
        });

        this.df = this.df.dropDuplicates(...this.model.duplicate);
    }
}

module.exports = Parser;