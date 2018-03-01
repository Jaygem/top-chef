var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var scrapper = require('./public/javascripts/scrapMichelin.js')

var index = require('./routes/index');
var users = require('./routes/users');
var tools = require('./tools');
console.log(typeof tools.LafourchetteScrapper); // => 'function'
console.log(typeof tools.michelinScrapper); // => 'function'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(express.static('public'));
app.use(express.static('views'));

console.log(typeof(scrapper));

console.log("bonobo");

var json = { name : "", offers : "", price : ""};

app.get('/index', function(req,res){
        res.send("Employee thingy");
        })

app.get('/bonobo', function(req, res){
        
    
        // The URL we will scrape from - in our example Anchorman 2.
        
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/';
        url2 = "https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true"
        url3 = "https://www.lafourchette.com/search-refine/France?page="
        // The structure of our request call
        // The first parameter is our URL
        // The callback function takes 3 parameters, an error, response status code and the html

        var arrayOfRestaurants = [];


        for(i=1;i<35;i++)
        {
            request(url+'page-'+i, function(error, response, html){

            // First we'll check to make sure no errors occurred when making the request

            if(!error){
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                var $ = cheerio.load(html);

                // Finally, we'll define the variables we're going to capture

                var title, release, rating;
                

                $('.poi_card-display-title').filter(function(){
                    var data = $(this);

                    name = data.children().first().text();

               // Once we have our title, we'll store it to the our json object.

                    json.title = title;
                })
                $('.mtpb2c-offers').filter(function(){
                    var data = $(this);

                    offers = data.children().first().text();

               // Once we have our title, we'll store it to the our json object.

                    json.title = title;
                })
                $('.mtpb2c-offers').filter(function(){
                    var data = $(this);

                    priceRange = data.children().first().text();

               // Once we have our title, we'll store it to the our json object.

                    json.title = title;
                    json.offers = offers;
                    json.price = priceRange;
                    arrayOfRestaurants.push(json);
                })

            }

        })

        }
        console.log(JSON.stringify(arrayOfRestaurants)); 
    
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})


})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;

