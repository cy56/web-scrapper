test10 = async() => {
    const mapper = require('./app/services/mapper')
    const filer = require('./app/services/filer')
    const db = require('./app/services/database');
    const path = require('path');
    const brand = 'RB88';
    const source = 'vendor';
    const vendor = 'CMD';
    const date = '2016-06-01';
    const report = 'summary';
    const filename = 'LicenseeWinLose1564380045475.csv';
    const filepath = path.join('./app/storages/downloads', filename);
    const unresolved = await filer.resolve({filename, filepath});
    const data = new mapper({ brand, source, vendor, report, date }, unresolved)
    const model = db[report.toLowerCase()][vendor.toLowerCase()];
    model.createMany(data.getResults());
    //console.log(unresolved)
    console.log(data.getResults());
}

test11 = async() => {
    const DataFrame = require('dataframe-js').DataFrame;

    let data = [
        ['cny', '2019-05-01', '1'],
        ['thb', '2019-05-01', '1'],
        ['cny', '2019-05-02', '1'],
        ['thb', '2019-05-02', '1'],
        ['cny', '2019-05-02', '1']
    ];

    let columns = ['currency', 'date', 'bets'];

    let duplicate = ['currency', 'date'];


    let df = new DataFrame(data, columns);

    //   if (df.listColumns().includes(duplicate[i])) {
    //       df =df.dropDuplicates(duplicate[i]);
    //   }
    // }
    console.log(df.dropDuplicates('currency').dropDuplicates('date').toCollection());
}

test12 = async() => {
    const db = require('./app/services/database');
    const datatable = require('./app/services/datatable');
    const brand = 'RB88';
    const vendor = 'pt';
    const report = 'player';
    const model = db[report.toLowerCase()][vendor.toLowerCase()];
    const results = await model.getDatatable({ brand, startDate: '2019-06-01', endDate: '2019-06-01', currency: 'cny'});
    const columns = model.getDatatableColumns();
    const compares = model.getOnDuplicateValues();
    const join = model.getDataIndexes();

    const table = new datatable(results, columns, compares, join);

    //console.log(columns);
    //console.log(compares);
    console.log(table.generateDatatable());
    //console.log(results);

}

test13 = async() => {
    const _ = require('lodash');

    const run = (callback) => {
        console.log('Resolving captcha...');
        setTimeout(() => {
            let captcha = '1235';
            callback(captcha);
            console.log('Resolved Done...');
        }, 3000);
    }

    const resolveCaptcha = (captcha) => {
        if (captcha === '1234') {
            return resolvedDone();
        }

        return resolvedFailed();
    }

    const resolvedDone = () => {
        console.log('captcha is correct');
    }

    const resolvedFailed = () => {
        console.log('captcha is wrong');
    }

    run(resolveCaptcha);
}

test14 = async() => {
    const htmlTable = `<table id="tablelist" class="table table-bordered table-hover table-sm"> <thead> <tr id="daily_title"> <th rowspan="2" class="number-column">#</th> <th rowspan="2">Date</th> <th rowspan="2">Currency</th> <th rowspan="2">Sports Ticket</th> <th rowspan="2">Turnover</th> <th rowspan="2">Net Turnover</th> <th colspan="3">Member Win Loss</th> <th rowspan="2">Licensee W/L</th> <th rowspan="2">Provider W/L</th> </tr> <tr id="monthly_title" class="hide" style="display: none;"> <th rowspan="2" class="number-column">#</th> <th rowspan="2">Currency</th> <th rowspan="2">Sports Ticket</th> <th rowspan="2">Turnover</th> <th rowspan="2">Net Turnover</th> <th colspan="3">Member Win Loss</th> <th rowspan="2">Licensee W/L</th> <th rowspan="2">Provider W/L</th> </tr> <tr> <th>Win Loss</th> <th>Comm</th> <th>Total</th> </tr> </thead> <tbody id="tbody"><tr class="bg-gray"><td>1</td><td class="text-center">07/24/2019</td><td class="text-center"><a href="LicenseeWinLoseCurr.aspx?resellerCode=&amp;merChantCode=&amp;curr=THB&amp;workdate=20190724&amp;datefrom=07-24-2019&amp;dateto=07-24-2019&amp;filter=0&amp;checkOld=false&amp;checkusd=false" data-type="winlose" class="opener" onclick="return false;">THB</a></td><td class="text-right">13,008</td><td class="text-right">6,301,356.00</td><td class="text-right">5,222,676.50</td><td class="text-right text-danger">-58,566.22</td><td class="text-right">11,655.28</td><td class="text-right text-danger">-46,910.93</td><td class="text-right tdb ">46,910.93</td><td class="text-right">5,270.96</td></tr><tr><td class="text-center bold" colspan="2" rowspan="1">Total</td><td class="text-center">THB</td><td class="text-right">13,008</td><td class="text-right">6,301,356.00</td><td class="text-right">5,222,676.50</td><td class="text-right text-danger">-58,566.22</td><td class="text-right">11,655.28</td><td class="text-right text-danger">-46,910.93</td><td class="text-right tdb ">46,910.93</td><td class="text-right ">5,270.96</td></tr><tr class="bold table-info"><td class="text-center" colspan="3">Total In <span class="text-condensed">USD</span></td><td class="text-right">13,008</td><td class="text-right">204,415.99</td><td class="text-right">169,423.63</td><td class="text-right text-danger">-1,899.89</td><td class="text-right">378.10</td><td class="text-right text-danger">-1,521.79</td><td class="text-right tdb ">1,521.79</td><td class="text-right">170.99</td></tr></tbody> </table>`
    // const JSDOM = require('jsdom')
    // const dom = new JSDOM(htmlTable)

    // const window = dom
    // const document = window
    // console.log(document)
    const jsdom = require("jsdom");
    const jquery = require('jquery');
    const excel = require('./app/services/excel')
    const { JSDOM } = jsdom;

    let dom = new JSDOM(htmlTable)
    let window = dom.window
    let document = dom.window.document
    let $ = jquery(window)
    // const table = document.querySelector('#tablelist')
    const link = document.querySelector('a.opener').getAttribute('href')
    console.log(link)
    // const converted = excel.convertHtmlTableToCSV(table)
    // const filtered = converted.filter(obj => {return obj.hasOwnProperty('#')})
    // console.log(filtered)
}

test15 = async() => {
    const data = [{ '#': 1, 'External ID': 'songwut100', 'System ID': 'RB88THBgb00040004cf', Currency: 'THB', 'Sports Ticket': 2, Turnover: 249, 'Member W/L': -58, __EMPTY: 0.45, __EMPTY_1: -57.55, 'Licensee W/L': 57.55, 'Provider W/L': 5.22 }, { '#': 2, 'External ID': 'piyawat8', 'System ID': 'RB88THBgb00040005n6', Currency: 'THB', 'Sports Ticket': 1, Turnover: 50, 'Member W/L': -50, __EMPTY: 0.09, __EMPTY_1: -49.91, 'Licensee W/L': 49.91, 'Provider W/L': 4.5 }, { '#': 3, 'External ID': 'Daron905', 'System ID': 'RB88THBgb00040007o3', Currency: 'THB', 'Sports Ticket': 1, Turnover: 1000, 'Member W/L': 870, __EMPTY: 1.8, __EMPTY_1: 871.8, 'Licensee W/L': -871.8, 'Provider W/L': -78.3 }, { '#': 4, 'External ID': 'spoiler2526', 'System ID': 'RB88THBgb00040009eo', Currency: 'THB', 'Sports Ticket': 1, Turnover: 100, 'Member W/L': 60, __EMPTY: 0.18, __EMPTY_1: 60.18, 'Licensee W/L': -60.18, 'Provider W/L': -5.4 }, { '#': 5, 'External ID': 'louissss03', 'System ID': 'RB88THBgb0004000b2y', Currency: 'THB', 'Sports Ticket': 4, Turnover: 39977, 'Member W/L': 35379.76, __EMPTY: 71.96, __EMPTY_1: 35451.72, 'Licensee W/L': -35451.72, 'Provider W/L': -3184.18 }, { '#': 6, 'External ID': 'TOT191', 'System ID': 'RB88THBgb0004000lyo', Currency: 'THB', 'Sports Ticket': 1, Turnover: 50, 'Member W/L': -50, __EMPTY: 0.09, __EMPTY_1: -49.91, 'Licensee W/L': 49.91, 'Provider W/L': 4.5 }, { '#': 7, 'External ID': 'Tassa22', 'System ID': 'RB88THBgb00040010c4', Currency: 'THB', 'Sports Ticket': 2, Turnover: 4655, 'Member W/L': 4071.2, __EMPTY: 8.38, __EMPTY_1: 4079.58, 'Licensee W/L': -4079.58, 'Provider W/L': -366.41 }, { '#': 8, 'External ID': 'Singdidir', 'System ID': 'RB88THBgb00040012pv', Currency: 'THB', 'Sports Ticket': 1, Turnover: 200, 'Member W/L': 190, __EMPTY: 0.36, __EMPTY_1: 190.36, 'Licensee W/L': -190.36, 'Provider W/L': -17.1 }, { '#': 9, 'External ID': '12346T89PLKB5', 'System ID': 'RB88THBgb0004001mxv', Currency: 'THB', 'Sports Ticket': 1, Turnover: 100, 'Member W/L': -100, __EMPTY: 0.18, __EMPTY_1: -99.82, 'Licensee W/L': 99.82, 'Provider W/L': 9 }, { '#': 'Total', Currency: 'THB', 'Sports Ticket': 14, Turnover: 46381, 'Member W/L': 40312.96, __EMPTY: 83.49, __EMPTY_1: 40396.45, 'Licensee W/L': -40396.45, 'Provider W/L': -3628.17 }, { '#': 'Total In USD', 'Sports Ticket': 14, Turnover: 1504.6, 'Member W/L': 1307.75, __EMPTY: 2.71, __EMPTY_1: 1310.46, 'Licensee W/L': -1310.46, 'Provider W/L': -117.7 }]

}

test16 = async() => {
    const storage = require('./app/services/storage')
    let key = 'PT'
    let filepath = `images/${key}/`
    let filename = 'test.txt'

    const file = await storage.touch({ filepath, ext:'txt', content: 'hello world' })

    console.log(file)
}

test10();