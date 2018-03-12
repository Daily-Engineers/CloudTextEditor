const nodemailer = require('nodemailer');
const getPassword = require('../config/MailConfig');



let send = function (too, subject, contents, cb) {
    var email = 'curlyboiseditor@gmail.com';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: getPassword()
        }
    });

    var mailOptions = {
        from: email,
        to: too,
        subject: subject,
        text: contents
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            cb
        } else {
            console.log('Email sent: ' + info.response);
            cb
        }
    });
}

module.exports = send;