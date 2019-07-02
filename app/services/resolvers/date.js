const dateService = require('date-and-time');

class dateResolver
{
    static getTimer() {
        return Date.parse(dateService.format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
    }

    static resolveDates(start, end) {
        return [dateService.format(new Date(start), 'YYYY-MM-DD'), dateService.format(new Date(end), 'YYYY-MM-DD')];
    }

    static resolveVendorDates(params = { vendor: null, start: null, end: null }) {
        try {
            let { vendor, start, end } = params;

            if (!vendor || !start) {
                throw "missing parameters";
            }

            if (!end) {
                end = start;
            }

            let items = this.getResolvedDateTime(start, end);
            const func = `resolveFor${vendor.toUpperCase()}`;
            return this[func](items);

        } catch (err) {
            console.log(err.message);
        }
    }

    static getResolvedDateTime(start, end) {
        let items = [];
        let diff = dateService.subtract(new Date(end), new Date(start)).toDays();

        if (diff === 0) {
            items.push({ start: new Date(start), end: new Date(start) });
        } else {
            items.push({ start: new Date(start), end: new Date(start) });
            for (let index = 0; index < diff; index++) {
                let date = items[items.length - 1].start || start;
                items.push(this.incrementDays(new Date(date)));
            }
        }
        return items;
    }

    static incrementDays(tDate) {
        let nDate = dateService.addDays(tDate, 1);
        return { start: nDate, end: nDate };
    }

    static resolveForCMD(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM-DD-YYYY');
            let end = dateService.format(item.end, 'MM-DD-YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForPT(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(item.end, 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForGD(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForMG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(item.end, 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForTGP(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForPGS(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(item.end, 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForGEN(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY/MM/DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY/MM/DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSBT(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD/MM/YYYY 00:00:00');
            let end = dateService.format(item.end, 'DD/MM/YYYY 23:59:59');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForBSG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD MMM YYYY 00:00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'DD MMM YYYY 00:00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForYGG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD 00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForAB(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 12:00:00');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD 12:00:00');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForAG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD 00:00:00');
            let end = dateService.format(item.end, 'YYYY-MM-DD 23:59:59');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForBETTRADE(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'DD MMM YYYY');
            let end = dateService.format(item.end, 'DD MMM YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForIPSB(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(item.end, 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForNLE(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSAG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'YYYY-MM-DD');
            let end = dateService.format(dateService.addDays(item.end, 1), 'YYYY-MM-DD');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSLC(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM/DD/YYYY');
            let end = dateService.format(item.end, 'MM/DD/YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }

    static resolveForSPG(items) {
        let dates = [];
        items.forEach((item) => {
            let start = dateService.format(item.start, 'MM/DD/YYYY');
            let end = dateService.format(item.end, 'MM/DD/YYYY');
            dates.push({ start: start, end: end });
        });
        return dates;
    }
}

module.exports = dateResolver;