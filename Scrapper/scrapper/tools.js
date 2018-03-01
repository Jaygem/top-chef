
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

// The URL we will scrape from - in our example Anchorman 2.

url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/';
url2 = "https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true"
url3 = "https://www.lafourchette.com/recherche/?idCity=415144&idProductLine=4792008e-cd3f-4616-b300-693fcbd13698#filters%5BPROMOTION%5D%5B50_PERCENT%5D=on&filters%5BPROMOTION%5D%5B40_PERCENT%5D=on&filters%5BPROMOTION%5D%5B30_PERCENT%5D=on&filters%5BPROMOTION%5D%5B20_PERCENT%5D=on&filters%5BPROMOTION%5D%5BPRESTIGE_MENU%5D=on&filters%5BPROMOTION%5D%5BOTHER%5D=on&filters%5BPRODUCT_LINE%5D%5B4792008e-cd3f-4616-b300-693fcbd13698%5D=on&page="
// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html

var arrayOfRestaurants = [];
var arrayOfPromotions =[];
var thisUrl;
var j = 0;
var json = {};
var json2 = {};

var customHeaderRequest = request.defaults({headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'}
})
/*
for(i=1;i<35;i++)
{
    thisUrl = url+'page-'+j;
    j++;
    customHeaderRequest.get(thisUrl,function(error, response, html){
        
        
            var $ = cheerio.load(html);

            $('.poi_card-display-title').filter(function(){
                var data = $(this);
                json.title = data.first().text();
            })
            
            $('.mtpb2c-offers').filter(function(){
                var data = $(this);

           // Once we have our title, we'll store it to the our json object.

                json.offers =  data.text();
            })
            $('.poi_card-display-price').filter(function(){
                var data = $(this);

                priceRange = data.text();

           // Once we have our title, we'll store it to the our json object.


                json.price = priceRange;
                arrayOfRestaurants.push(json);
            })
        //console.log(json);

        

    })
    
    }
*/
j = 1;

//var html = '<ul class="list-unstyled"></ul>';

for(i=1;i<79;i++)
{
    thisUrl2 = url3+j;
    j++;
    
    customHeaderRequest.get(thisUrl2, function(error, response, html){
        
            
        
            var $ = cheerio.load(html);
        
            //console.log($('.resultItem-address').text());
            var allData = $('.resultItem').children().text().split('*');
            allData.forEach(function(elem){
                elem.split('\n');
                console.log(elem+'\n\n\n');
            })
            /*
            
            $('.resultItem-name').filter(function(){
                var data = $(this);
                json2.Name = data.text();
            })
        
        
            $('.resultItem-address').filter(function(){
                var data = $(this);
                json2.Address = data.text();
            })
            $('.resultItem-saleType resultItem-saleType--specialOffer').filter(function(){
                var data = $(this);
                json2.Offer =data.text();
            })
            $('.resultItem-averagePrice').filter(function(){
                
                var data = $(this);

                json2.Price = data.text();
                arrayOfPromotions.push(json2);
            })

        
//console.log(json2);*/
    })
     
    }
console.log(JSON.stringify(arrayOfPromotions));
console.log(JSON.stringify(arrayOfRestaurants)); 
