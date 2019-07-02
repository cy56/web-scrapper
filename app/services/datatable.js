const _ = require('lodash');

class DataTable
{
    static async resolve(params = { keys: null, data: null }) {
        try {
            if (!params.keys || !params.data) {
                throw 'no keys or dataset';
            }

            let { keys, data } = params;
            let datas = _.orderBy(data, ['currency'], ['asc']);
            let items = [];
            let lastItem = null;

            datas.forEach((obj) => {
                if (lastItem === null) {
                    lastItem = obj;
                    if (datas.length === 1) {
                        lastItem.diff = false;
                        items.push(lastItem);
                    }
                    return;
                }
                if (lastItem.currency === obj.currency) {
                    if (_.isEqual(_.omit(lastItem, keys), _.omit(obj, keys))) {
                        lastItem.diff = false;
                        obj.diff = false;
                        items.push(lastItem);
                        items.push(obj);
                    } else {
                        lastItem.diff = true;
                        obj.diff = true;
                        items.push(lastItem);
                        items.push(obj);
                    }
                    lastItem = null;
                    return;
                }
            });
            return items;
        } catch (err) {
            throw err.message;
        }
    }
}