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

// Nodemailer 


// END Nodemailer 

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
        service: 'gmail',
        auth: {
            user: 'rideoutweb',
            pass: '3625Pinkship!'
        }
    });

    var mailNewInquiry = {
        from: 'rideoutweb@gmail.com',
        to: 'rideoutweb@gmail.com',
        subject: 'A person is reaching out!',
        text: 'Oh yeah! KoolAid Man!'
    };

    var mailConfirmation = {
        from: 'rideoutweb@gmail.com',
        to: user_email,
        subject: 'This is your email confirmation!',
        text: 'Hi ' + user_name + ', thanks for reaching out. This is an automatic message just letting you know your email went through. I will get in touch within a few business days. Thanks!',
    };

    var orderReq = transporter.sendMail(mailNewInquiry);

    var orderConfirm = transporter.sendMail(mailConfirmation);

    let ifError = false;

    Promise.all([orderReq, orderConfirm])
        .then(([result1, result2]) => {
            console.log("Emails sent");
        })
        .catch(err => {
            ifError = true;
        });

    res.render('contact', {
        pageTitle: "Contact",
        sentBool: true,
        isError: ifError,
    });

});

// || Listener 

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server started at port ${port}.`));


// || END of document