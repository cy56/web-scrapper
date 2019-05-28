const date = require('date-and-time');

class dateresolver {

    constructor(params = { vendor: null, start: null, end: null }) {
        if (params.vendor == null || params.start == null) {
            throw "missing parameters";
        }

        this.vendor = params.vendor.toUpperCase();
        this.start = params.start;
        this.end = params.end || params.start;
        this.dates = [];

        return this;
    }

    getResult() {
        let items = this.getResolvedDateTime(this.start, this.end);
        const func = `resolveFor${this.vendor}`;
        return this[func](items);
    }

    getResolvedDateTime(start, end) {
        let items = [];
        let diff = date.subtract(new Date(end), new Date(start)).toDays();

        if(diff === 0) {
            items.push({ start: new Date(start), end: new Date(start) });
        } else {
            items.push({start: new Date(start), end: new Date(start)});
            for (let index = 0; index < diff; index++) {
                items.push(this.incrementDays(new Date(start)));
            }
        }

        return items;
    }

    incrementDays(tDate) {
        let nDate = date.addDays(tDate, 1);
        return { start: nDate, end: nDate};
    }

    resolveForCMD(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'MM-DD-YYYY');
            let end = date.format(item.end, 'MM-DD-YYYY');
            this.dates.push({start:start, end:end});
        });
        return this;
    }

    resolveForGD(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD');
            let end = date.format(date.addDays(item.end, 1), 'YYYY-MM-DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForMG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY/MM/DD');
            let end = date.format(item.end, 'YYYY/MM/DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForTGP(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY/MM/DD');
            let end = date.format(item.end, 'YYYY/MM/DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForPGS(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD');
            let end = date.format(item.end, 'YYYY-MM-DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForGEN(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY/MM/DD');
            let end = date.format(date.addDays(item.end, 1), 'YYYY/MM/DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForSBT(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'DD/MM/YYYY 00:00:00');
            let end = date.format(item.end, 'DD/MM/YYYY 23:59:59');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForBSG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'DD MMM YYYY 00:00:00');
            let end = date.format(date.addDays(item.end, 1), 'DD MMM YYYY 00:00:00');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForYGG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD 00:00');
            let end = date.format(date.addDays(item.end, 1), 'YYYY-MM-DD 00:00');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForAB(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD 12:00:00');
            let end = date.format(date.addDays(item.end, 1), 'YYYY-MM-DD 12:00:00');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForAG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD 00:00:00');
            let end = date.format(item.end, 'YYYY-MM-DD 23:59:59');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForBETTRADE(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'DD MMM YYYY');
            let end = date.format(item.end, 'DD MMM YYYY');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForIPSB(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD');
            let end = date.format(item.end, 'YYYY-MM-DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForNLE(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD');
            let end = date.format(date.addDays(item.end, 1), 'YYYY-MM-DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForSAG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'YYYY-MM-DD');
            let end = date.format(item.end, 'YYYY-MM-DD');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForSLC(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'MM/DD/YYYY');
            let end = date.format(item.end, 'MM/DD/YYYY');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }

    resolveForSPG(items) {
        items.forEach((item) => {
            let start = date.format(item.start, 'MM/DD/YYYY');
            let end = date.format(item.end, 'MM/DD/YYYY');
            this.dates.push({ start: start, end: end });
        });
        return this;
    }
}

module.exports = dateresolver