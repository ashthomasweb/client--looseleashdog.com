const nodemailer = require("nodemailer");
const {
    user_name,
    user_email,
    message,
} = require('./app.js')


var transporter = nodemailer.createTransport({
    host: 'mi3-ts3.a2hosting.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
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

    let b = a.replace(/\n/g, "").replace(/\r/g, "");

    return b;
};

function userAutoReply() {

    let a = `<div style='max-width: 100%; padding: 2rem; border: 1px solid lightgrey; border-radius: 12px; margin: 1rem;'>
    <h2>Thanks for reaching out to LooseLeashDog. This is an automatic response confirming that your email was sent.</h2>
    <p>I will reach out to you within the next few days.</p>
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
    </div>
    <br>
    <p>Thanks for contacting me, I'm looking forward to speaking with you.</p>
    <p>Remember, this is just an automatic email and doesn't accept replys.</p>`;

    let b = a.replace(/\n/g, "").replace(/\r/g, "");

    return b;
};

function mailNewInquiry(user_name, user_email, message) {
    return `{"from": "mailer@looseleashdog.com",
    "to": "rideoutweb@gmail.com",
    "subject": "A person from your website is reaching out!",
    "html": "${userMessage()}"}`
};

function mailConfirmation(user_name, user_email, message) {
    return `{"from": "mailer@looseleashdog.com",
    "to": "${user_email}",
    "subject": "This is your email confirmation from LooseLeashDog!",
    "html": "${userAutoReply()}"}`
};

let inquiry = JSON.parse(mailNewInquiry(user_name, user_email, message));
let finalConfirm = JSON.parse(mailConfirmation(user_name, user_email, message));

module.exports = {
    transporter,
    userMessage,
    userAutoReply,
    inquiry,
    finalConfirm
};