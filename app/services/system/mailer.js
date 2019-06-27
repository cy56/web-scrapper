const nodemailer = require('nodemailer');

const USERNAME = 'lim.cy@nettium.net'
const PASSWORD = `r4t5y6;'`

class Mailer
{
    constructor() {
        try {
            this.service = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: USERNAME,
                    pass: PASSWORD
                }
            });
            return this;
        } catch (err) {
            console.error('Mailer Failed:', err.message);
        }
    }

    async send(target={mail:'lim.cy@nettium.net', subject:'System Error from WebScrapper', text:'System Error...'}) {
        try {
            await this.service.sendMail({
                from: USERNAME,
                to: target.mail,
                subject: target.subject,
                text: target.text
            });
        } catch (err) {
            console.error('Mailer Failed:', err.message);
        }
    }
}

module.exports = Mailer;