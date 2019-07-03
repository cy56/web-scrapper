const library = require('dataframe-js').DataFrame;

class DataFrame
{
    static diff(setA, setB, compares) {
        const df1 = new library(setA);
        const df2 = new library(setB);

        return df2.diff(df1, compares).toCollection();
    }

    static where(data, wheres = {}) {
        const df = new library(data);

        return df.where(wheres).toCollection();
    }
}

module.exports = DataFrame;