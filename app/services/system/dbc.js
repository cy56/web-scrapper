const dbc = require('../../libraries/deathbycaptcha');
const creds = require('./configs/dbc');

class CaptchaResolver
{
    constructor() {
        this.creds = creds;
        this.username = this.creds.username;
        this.password = this.creds.password;
        this.client = null;
        this.init();
    }

    init() {
        try {
            this.client = new dbc.SocketClient(this.username, this.password);
        }catch(err) {
            console.error(err);
        }
    }

    getBalance() {
        return new Promise((resolve, reject) => {
            if(!this.client) {
                reject('dbc connect failed...');
            }

            this.client.get_balance((balance) => {
                resolve(balance);
            });
        });
    }

    decode(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                reject('dbc connect failed...');
            }
            this.client.decode(options, (captcha) => {
                if(captcha) {
                    resolve(captcha);
                } else {
                    reject(captcha);
                }
            });
        });
    }

    report(options = {}) {
        return new Promise((resolve, reject) => {
            if(!this.client) {
                reject('dbc connect failed...');
            }

            this.client.report(options['captcha'], (result) => {
                resolve(`Report Status: ${result}`);
            });
        });
    }
}

module.exports = CaptchaResolver