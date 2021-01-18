// Node.js/Express Server "app.js" for "Looseleashdog" 

// Dependencies
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const favicon = require('express-favicon');
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
    console.log(autoMail.n);
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

app.post('/contact', function (req, res) {

    let ifError = false;
    let renderPage = res.render('contact', {
        pageTitle: "Contact",
        responseBool: true,
        isError: ifError,
    });
    const {
        user_name,
        user_email,
        message
    } = req.body;

    module.exports = { user_email, user_name, message };

    const { transporter, mailNewInquiry } = require('./test.js');



    let x = mailNewInquiry(user_name, user_email, message);

    console.log(x.charCodeAt(253));
    let y = JSON.parse(x);

    console.log(x.charAt(2));
    console.log(x.charAt(282));
    console.log(x.charAt(283));
    console.log(x.charAt(284));
    console.log(x.charAt(285));

    // let y = JSON.parse(x);

    transporter.sendMail(y, function (error, info) {
        if (error) {
            console.log('Inquiry email error', error);
            ifError = true;
        } else {
            console.log('Inquiry sent: ' + info.response);
            renderPage;
        }
    });

    // transporter.sendMail(mailConfirmation, function (error, info) {
    //     if (error) {
    //         console.log('Confirmation email error', error);
    //         ifError = true;
    //     } else {
    //         console.log('Confirmation sent: ' + info.response);
    //         renderPage;
    //     }
    // });

});

// || Listener 

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.log(`Server started at port ${port}.`));


// || END of document