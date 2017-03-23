var express = require('express');
var mysql = require('mysql');
var app = express();
var i;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
var connection = mysql.createConnection({
    host: '206.12.96.242',
    user: 'group7',
    password: 'untanglingGroup7',
    database: 'p3'
});
connection.connect();

var listings;

connection.query('SELECT * FROM items', function(err, rows, fields) {
    if (err) throw err;
    console.log("******************");
    console.log("Query to display all the contents");
    console.log("******************");
    listings = rows;
    for( i=0; i<rows.length;i++){
        console.log(rows[i]);
    }
    
});

connection.query('SELECT items.itemsname, items.itemsprice  FROM items WHERE itemsprice>1.25;', function(err, rows, fields) {
    if (err) throw err;
    console.log("******************");
    console.log("Query to display all items over $1.25");
    console.log("******************");
    listings = rows;
    for( i=0; i<rows.length;i++){
        console.log(rows[i]);
    }
    
});

connection.end();

app.get('/', function(req, res) {


    res.render('simple1', { listings: listings })
})

// about page 
app.get('/about', function(req, res) {
    var sentence = "this is a test about page, passed as a variable through ejs";
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    res.render('about', {
        drinks: drinks,
        sentence: sentence
    });
});

app.listen(8007, function() {
    console.log('Example app listening on port 8007!')
})