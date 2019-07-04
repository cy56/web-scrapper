const library = require('dataframe-js').DataFrame;

class DataFrame
{
    static diff(data, compares, indexes = ['currency', 'date'], group = 'source') {
        const df = new library(data);
        const data1 = grouped[0].group;
        const data2 = grouped[1].group;
        let differences = data1.diff(data2, compares);
        let datadiff = differences.toCollection();

        datadiff.forEach((item) => {
            let filter = {};
            indexes.forEach((index) => {
                filter[index] = item[index];
            });
            results[Object.values(filter).join('@')] = df.where(filter).toCollection();
        });

        return results;
    }

    static where(data, wheres = {}) {
        const df = new library(data);

        return df.where(wheres).toCollection();
    }
}

module.exports = DataFrame;