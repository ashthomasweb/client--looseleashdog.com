/* --- Dependencies --- */
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const blogInfo = require('./public/js/blogIndex.js')
const favicon = require('express-favicon');


/* --- Module Assignments --- */
const app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));




/* --- ejs Routes --- */

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: "Home",
    });
})

;

app.get('/services', function (req, res) {
    res.render('services', {
        pageTitle: "Services",
    });
});


app.get('/blog', function (req, res) {
    res.render('blog', {
        pageTitle: "Blog",
        postInfo: blogInfo.postData,
    });

});


app.get('/posts/:postTitle', function (req, res) {
    let url = './posts/' + req.params.postTitle;
    if (url) {
        res.render(url, {
            pageTitle: "Hello",

        });
    }

});




app.get('/photos', function (req, res) {
    res.render('photos', {
        pageTitle: "Photos",
    });
});

// app.get('/video', function (req, res) {
//     res.render('video', {
//         pageTitle: "Video",
//     });
// });

app.get('/contact', function (req, res) {
    res.render('contact', {
        pageTitle: "Contact",
    });
});




/* --- Localhost --- */
app.listen(3000, function () {
    console.log('Server started on port 3000.');
});