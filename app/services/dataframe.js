const library = require('dataframe-js').DataFrame;

class DataFrame
{
    static diff(data, compares, indexes = ['currency', 'date'], group = 'source') {
        let results = {};
        const df = new library(data);
        const grouped = df.groupBy(group).toCollection();
        const data1 = grouped[0].group;
        const data2 = grouped[1].group;
        let differences = data1.diff(data2, compares);
        let datadiff = differences.toCollection();

        datadiff.forEach((item) => {
            let filter = {};
            indexes.forEach((i) => {
                filter[i] = item[i];
            });
            let index = Object.values(filter).join('@');
            let dataframe = df.where(filter);
            results[index] = dataframe.toCollection();
        });

        return results;
    }

    static where(data, wheres = {}) {
        const df = new library(data);

        return df.where(wheres).toCollection();
    }
}

module.exports = DataFrame;