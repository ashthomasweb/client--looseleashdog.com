// Node.js/Express Server "app.js" for "Looseleashdog" 

// Dependencies
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const favicon = require('express-favicon');
const nodemailer = require("nodemailer");
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
var prismicEndpoint = 'https://looseleashdog.prismic.io/api/v2';

const app = express();

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
}

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
}
// END Prismic

// Route Handlers

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: 'Home',
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
        sentBool: false,
    });
});

app.post('/contact', function (req, res) {
    const {
        user_name,
        user_email,
        message
    } = req.body;
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        host: 'mi3-ts3.a2hosting.com',
        port: 465,
        secure: true,
        auth: {
            user: "info@looseleashdog.com",
            pass: "tempword!!"
        }
    });

    // var mailOptions = {
    //     from: 'info@looseleashdog.com',
    //     to: 'rideoutweb@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: message
    // };


    var mailNewInquiry = {
        from: 'info@looseleashdog.com',
        to: 'rideoutweb@gmail.com',
        subject: 'A person from your website is reaching out!',
        html: `<h1>A person from your website is reaching out!</h1>
            <div style="max-width: 100%; padding: 2rem; border: 1px solid lightgrey; border-radius: 12px; margin: 1rem;">    
                <h2>From:</h2>
                <div style="padding: 0rem 2rem;">
                    <p><strong>${user_name}</strong></p>
                </div>
                <h2>Email:</h2>
                <div style="padding: 0rem 2rem;">
                    <p>${user_email}</p>
                </div>
                <h2>Message:</h2>
                <div style="padding: 0rem 2rem;">
                    <p>${message}</p>
                </div>
            </div>`
    };

    var mailConfirmation = {
        from: 'info@looseleashdog.com',
        to: user_email,
        subject: 'This is your email confirmation!',
        html: `<h1>Hi ${user_name}, thanks for reaching out.</h1>
            <p>This is an automatic message just letting you know your email went through. I will get in touch within a few business days. This is what I received:</p>
            <div style="max-width: 100%; padding: 2rem; border: 1px solid lightgrey; border-radius: 12px; margin: 1rem;">    
                <h2>From:</h2>
                <div style="padding: 0rem 2rem;">
                    <p><strong>${user_name}</strong></p>
                </div>
                <h2>Email:</h2>
                <div style="padding: 0rem 2rem;">
                    <p>${user_email}</p>
                </div>
                <h2>Message:</h2>
                <div style="padding: 0rem 2rem;">
                    <p>${message}</p>
                </div>
            </div>`
    };


    transporter.sendMail(mailNewInquiry, function (error, info) {
        if (error) {
            console.log('Inquiry email error', error);
            //   ifError = true;

        } else {
            console.log('Inquiry sent: ' + info.response);
        }
    });

    transporter.sendMail(mailConfirmation, function (error, info) {
        if (error) {
            console.log('Confirmation email error', error);
            //   ifError = true;

        } else {
            console.log('Confirmation sent: ' + info.response);
        }
    });


    res.render('contact', {
        pageTitle: "Contact",
        sentBool: true
        // isError: ifError,
    });

});

// || Listener 

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server started at port ${port}.`));


// || END of document