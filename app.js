// Node.js/Express Server "app.js" for "Looseleashdog" 

// Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const ejs = require('ejs');
const favicon = require('express-favicon');
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
var prismicEndpoint = 'https://looseleashdog.prismic.io/api/v2';
const secure = require("ssl-express-www");


const app = express();
app.use(secure);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Prismic
// Standardized URLs for known types
var linkResolver = function (doc) {
    if (doc.type === 'blog') return "/post/" + doc.uid;
    if (doc.type === 'page') return "/" + doc.uid;
    // Fallback for other types, in case new custom types get created
    return "/";
};

// Middleware to inject prismic context
app.use(function (req, res, next) {
    res.locals.ctx = {
        endpoint: prismicEndpoint,
        linkResolver: linkResolver,
    };
    res.locals.PrismicDOM = PrismicDOM;
    next();
});

// Initialize the prismic api
function initApi(req) {
    return Prismic.getApi(prismicEndpoint, {
        req: req
    });
};
// END Prismic

// Route Handlers

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: 'LooseLeashDog',
    });
});

app.get('/about', function (req, res) {
    res.render('about', {
        pageTitle: "About",
    });
});

app.get('/services', function (req, res) {
    res.render('services', {
        pageTitle: "Services",
    });
});

app.get('/blog', function (req, res) {
    initApi(req).then(function (api) {
        api.query(
            Prismic.Predicates.at('document.type', 'post')
        ).then(function (response) {
            // "response" is the data object.
            res.render('blog', {
                document: response.results,
                pageTitle: "Blog",
            });
        });
    });
});

app.get('/posts/:postTitle', function (req, res) {
    let url = './posts/' + req.params.postTitle;
    initApi(req).then(function (api) {
        api.query(
            Prismic.Predicates.at('document.type', 'post')
        ).then(function (response) {
            // "response" is the data object.
            if (url) {
                res.render('post', {
                    document: response.results,
                    pageTitle: "Blog Post",
                    title: req.params.postTitle.replace(/-/g, ' '),
                });
            }
        });
    });
});

app.get('/photos', function (req, res) {
    res.render('photos', {
        pageTitle: "Photos",
    });
});

app.get('/contact', function (req, res) {
    res.render('contact', {
        pageTitle: "Contact",
        responseBool: false,
    });
});

app.post('/contact', async (req, res) => {

    let ifError = false;

    let {
        user_name,
        user_email,
        message
    } = req.body;

    // Mailer transport object 

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })
    
    const accessToken = await oauth2Client.getAccessToken()
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
  
    // Templates
    function inquiryTemplate() {

        let inqTemplate = `

            <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>
                <h2>Hi Emily, someone is reaching out from your website!</h2>
                    <p>Below is a copy of the email.</p> 
                <h2>From:</h2>
                    <p style='padding: 0 30px;'><strong>${user_name}</strong></p>
                <h2>Email:</h2>
                    <p style='padding: 0 30px;'>${user_email}</p>
                <h2>Message:</h2>
                    <p style='padding: 0 30px;'>${message}</p>
            </div>
        
            `; 

        let output = inqTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    function confirmTemplate() {

        let confTemplate = `

            <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>   
                <h2>Hi ${user_name}, thanks for reaching out to LooseLeashDog!</h2>
                    <p>This is an automatic response confirming that your email was sent. I will reach out to you within the next few days. Below is a copy of your email.</p> 
                    <p>Remember, this is an automatic email and doesn't accept replys.</p>
                <h2>From:</h2>
                    <p style='padding: 0 30px;'><strong>${user_name}</strong></p>  
                <h2>Email:</h2>
                    <p style='padding: 0 30px;'>${user_email}</p>
                <h2>Message:</h2>
                    <p style='padding: 0 30px;'>${message}</p>
            </div>

            `;

        let output = confTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    // Nodemailer email objects
    function mailNewInquiry(user_name, user_email, message) {
        return `{"from": "info.looseleashdog@gmail.com",
                "to": "emily.elizabeth.platt@gmail.com",
                "subject": "A person from your website is reaching out!",
                "html": "${inquiryTemplate()}"}`;
    };

    function mailConfirmation(user_name, user_email, message) {
        return `{"from": "info.looseleashdog@gmail.com",
                "to": "${user_email}",
                "subject": "This is your email confirmation from LooseLeashDog!",
                "html": "${confirmTemplate()}"}`;
    };

    // // Object parsing
    let inquiry = JSON.parse(mailNewInquiry(user_name, user_email, message));
    let finalConfirm = JSON.parse(mailConfirmation(user_name, user_email, message));
    
    var userConf = transporter.sendMail(finalConfirm);
    var userInquiry = transporter.sendMail(inquiry);

    Promise.all([userInquiry, userConf])
        .then(([resultInq, resultConf]) => {
            console.log("Emails sent", resultInq, resultConf);
        })
        .catch((err) => {
            console.log(err);
            console.log('error')
            ifError = true;
        })
        .finally(() => {
            res.render('contact', {
                pageTitle: "Contact",
                responseBool: true,
                isError: ifError,
            });
            transporter.close();
        });

});

// || Listener 

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server started at port ${port}.`));

// || END of document
