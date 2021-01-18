const nodemailer = require("nodemailer");
const { user_name, user_email, message } = require('./app.js')


var transporter = nodemailer.createTransport({
    host: 'mi3-ts3.a2hosting.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


function userMessage() {

    let a = `<div style='max-width: 100%; padding: 2rem; border: 1px solid lightgrey; border-radius: 12px; margin: 1rem;'>
    <h2>From:</h2>
    <div style='padding: 0rem 2rem;'>
    <p><strong>${user_name}</strong></p>
    </div>
    <h2>Email:</h2>
    <div style='padding: 0rem 2rem;'>
    <p>${user_email}</p>
    </div><h2>Message:</h2>
    <div style='padding: 0rem 2rem;'>
    <p>${message}</p>
    </div>
    </div>`;

    let b = a.replace(/\n/g, "");

    return b;
};

function mailNewInquiry(user_name, user_email, message) {
    return `{"from": "info@looseleashdog.com",
    "to": "rideoutweb@gmail.com",
    "subject": "A person from your website is reaching out!",
    "html": "${userMessage()}"}`
};

// var mailConfirmation = {
//     from: 'info@looseleashdog.com',
//     to: user_email,
//     subject: 'This is your email confirmation from LooseLeashDog!',
//     html: `<h1>Hi ${user_name}, thanks for reaching out.</h1>
//             <p>This is an automatic message just letting you know your email went through. I will get in touch within a few business days. Below is a copy of what I received:</p>
//             ${userMessage}`
// };




module.exports = {
    transporter, userMessage, mailNewInquiry 
};