
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
app.use(bodyParser.urlencoded({extended: true}));

/* --- Database connection --- */
mongoose.connect('mongodb://localhost:27017/tiredPalsDB', {useNewUrlParser: true, useUnifiedTopology: true, });

/* --- Database structuring --- */
const itemsSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemsSchema);

/* --- Database item --- */
const defaultItem = new Item({
    name: "Keep moving",
});

defaultItem.save();

/* --- Static Route --- */
// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/index.html");
// });

/* --- ejs Route --- */

app.route('/')

    .get(function(req, res){
        res.render('home', {
            pageTitle: "Home",
            
        });
    })
;

app.get('/about', function(req,res){
    res.render('about', {
        pageTitle: "About",
    });
});











/* --- Localhost --- */
app.listen(3000, function(){
    console.log('Server started on port 3000.');
});