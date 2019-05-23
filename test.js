const PuppeteerClient = require('./app/services/puppeteer');

class Parent 
{
    constructor() {

    }

    test() {
        console.log('parent test');
    }
}

class Child extends Parent
{
    constructor() {
        super();
    }

    test() {
        console.log('child test');
    }
}

const test = new Child();

test.test();