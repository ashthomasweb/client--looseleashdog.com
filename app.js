/* --- Dependencies --- */
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const favicon = require('express-favicon');
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
const nodemailer = require('nodemailer');


var linkResolver = function (doc) {
    // Pretty URLs for known types
    if (doc.type === 'blog') return "/post/" + doc.uid;
    if (doc.type === 'page') return "/" + doc.uid;
    // Fallback for other types, in case new custom types get created
    return "/";
}


const app = express();
var apiEndpoint = 'https://ashleyth-test.prismic.io/api/v2';

app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware to inject prismic context
app.use(function (req, res, next) {
    res.locals.ctx = {
        endpoint: apiEndpoint,
        linkResolver: linkResolver,
    };
    // add PrismicDOM in locals to access them in templates.
    res.locals.PrismicDOM = PrismicDOM;
    next();
});


// Initialize the prismic.io api
function initApi(req) {
    return Prismic.getApi(apiEndpoint, {
        req: req
    });
}


/* --- ejs Routes --- */

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: 'Home',
    });
});



app.get('/services', function (req, res) {
    res.render('services', {
        pageTitle: "Services",
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
    });
});


app.get('/blog', function (req, res) {
    initApi(req).then(function (api) {
        api.query(
            Prismic.Predicates.at('document.type', 'post')
        ).then(function (response) {
            // response is the response object. Render your views here.
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
            // response is the response object. Render your views here.
            if (url) {


                res.render('post', {
                    document: response.results,
                    pageTitle: "Blog",
                    title: req.params.postTitle.replace(/-/g, ' '),
                });
            }
        });
    });
});


/* --- Heroku --- */
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
    console.log('Server started on port 3000.');
}

/* --- Localhost --- */
app.listen(port, function () {});


// app.listen(0, () => {});