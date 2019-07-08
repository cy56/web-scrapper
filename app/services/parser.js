const DataFrame = require('dataframe-js').DataFrame;
const _ = require('lodash');
const _resolver = require('./resolver');
const _currency = require('./currency');

class Parser
{
    constructor(params = { brand:null, source:null, vendor:null, date:null, currency:null }, data, model = { parser:null , cast:null }) {
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
        this.currency = (currency) ? currency.toLowerCase() : null;
        this.data = data;
        this.model = model;
        this.df = null;
    }

    getResults() {
        try {
            if(!this.df) {
                this.df = new DataFrame(this.data, this.model.parser);
            }

            for(let item of this.model.cast) {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0];
                if(_.isNumber(value)) {
                    this.df = this.df.cast(key, (val) => _currency.convert(val, value));
                } else {
                    this.df = this.df.cast(key, value);
                }
            }
        

            this.df = this.df.withColumn('source', () => this.source)
            .withColumn('brand', () => this.brand)
            .withColumn('date', () => this.date);

            if (!this.df.listColumns().includes('currency')) {
                this.df = this.df.withColumn('currency', () => this.currency);
            }

            if(this.df.listColumns().includes('currency')) {
                this.df = this.df.dropDuplicates('currency');
            }

            if(this.df.listColumns().includes('username')) {
                this.df = this.df.dropDuplicates('username');
            }

            return this.df.toCollection();

        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = Parser;