/* --- Dependencies --- */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
//const /* variable */ = require(__dirname + /* '/public/js/file.js' */)

/* --- Module Assignments --- */
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

/* --- Database connection --- */
mongoose.connect('mongodb://localhost:27017/emilyPlattDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* --- Database structuring --- */
const postsSchema = {
    title: String,
    html: String,
};

const Post = mongoose.model("Post", postsSchema);

/* --- Database item --- */
const defaultPost = new Post({
    title: "Keep moving",
    html: "<h1>Ready?</h1><img src='/images/cincy.jpg'>
        <p class='test'>Hello there!</p>",
});

defaultPost.save();


/* --- ejs Routes --- */

app.route('/')

    .get(function (req, res) {
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
    Post.find({}, function (err, foundPosts) {
        
        res.render('blog', {
            pageTitle: "Blog",
            foundPosts: foundPosts,
        });
    });
});



app.get('/photos', function (req, res) {
    res.render('photos', {
        pageTitle: "Photos",
    });
});

app.get('/video', function (req, res) {
    res.render('video', {
        pageTitle: "Video",
    });
});

app.get('/contact', function (req, res) {
    res.render('contact', {
        pageTitle: "Contact",
    });
});




/* --- Localhost --- */
app.listen(3000, function () {
    console.log('Server started on port 3000.');
});