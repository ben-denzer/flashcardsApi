var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
const mailgunAuth = require('../../.mailgun_conf.js');

const auth = {
    auth: {
        api_key: mailgunAuth.api_key,
        domain: mailgunAuth.domain
    }
}

const sendMail = (email, cb) => {
var nodemailerMailgun = nodemailer.createTransport(mg(auth));

nodemailerMailgun.sendMail({
    from: 'ben@bdenzer.com',
    to: email, // An array if you have multiple recipients.
    subject: 'Password Reset',
    'h:Reply-To': 'denzer.ben@gmail.com',
    html: 'Here is your link: <a href="http://google.com">Google</a>',
    }, (err, info) => {
        if (err) {
            console.log(err);
            cb(err);
        }
        else {
            cb(null, info);
        }
    });
};

module.exports = sendMail;