const _ = require('lodash');
const DataFrame = require('dataframe-js').DataFrame;
const currency = require('./currency');

class DataTable
{
    constructor(data, columns, compares, join, group = 'source') {
        this.df = new DataFrame(data);
        this.columns = columns;
        this.compares = compares;
        this.group = group;
        this.join = join;
    }

    generateDatatable() {

        if(!this.df || !this.columns || !this.group) {
            throw 'missing data';
        }

        const grouped = this.getSeparatedGroup();

        if(grouped.indexes.length !== 2) {
            return false;
        }

        return this.getDiffGroup(grouped.groups, grouped.indexes);
    }

    getSeparatedGroup() {
        let groups = [];
        let indexes = [];

        const grouped = this.df.groupBy(this.group).toCollection();

        for(let record of grouped) {
            let item = record.group;
            let index = item.toCollection()[0][this.group];
            groups[index] = item.select(...this.getSelectedColumns())
                            .renameAll(this.getRenameColumns(index));
            indexes.push(index);
        }

        return { groups, indexes };
    }

    getSelectedColumns() {
        let columns = this.columns;

        if (columns.includes(this.group)) {
            let index = columns.indexOf(this.group);
            delete columns[index];
        }

        let items = columns.filter(function (el) {
            return el != null;
        });

        return items;
    }

    getRenameColumns(index) {
        let items = [];
        let item = null;

        for (let column of this.getSelectedColumns()) {
            if (column === 'currency' || column === 'date' || column === 'username') {
                item = column;
            } else {
                item = `${index}_${column}`;
            }

            items.push(item);
        }

        return items;
    }

    getDiffGroup(groups, indexes) {
        const key = 'diff';
        let diffGroup = groups[indexes[0]].join(groups[indexes[1]], this.join, 'full');

        for(let column of this.compares) {
            diffGroup = diffGroup.withColumn(
                `${key}_${column}`, (row) => currency.convert(row.get(`${indexes[0]}_${column}`) - row.get(`${indexes[1]}_${column}`), 4)
            )
        }
        
        return { data: diffGroup.toCollection(), column: diffGroup.listColumns() };
    }
}


module.exports = DataTable;