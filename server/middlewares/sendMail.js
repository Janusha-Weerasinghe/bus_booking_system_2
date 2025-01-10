const nodemailer = require ('nodemailer')

const transtport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env.CODE_SENDING_EMAIL_PASSWORD,
    }
});

module.exports=transtport;