
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
var getJSON = require('get-json')
var each = require('async-each');


// The URL we will scrape from 

url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/';
url2 = "https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true"
url3 = "https://www.lafourchette.com/restaurant+paris?page=2&sort=POPULARITY_DESC&filters[PROMOTION][50_PERCENT]=on&filters[PROMOTION][40_PERCENT]=on&filters[PROMOTION][30_PERCENT]=on&filters[PROMOTION][20_PERCENT]=on&filters[PROMOTION][PRESTIGE_MENU]=on&filters[PROMOTION][OTHER]=on&filters[PRODUCT_LINE][4792008e-cd3f-4616-b300-693fcbd13698]=on&page="





var allJson = [];
var OnlyTheOnes = [];
var arrayOfRestaurants = [];
var thisUrl;
var j = 0;
var json = {};

var customHeaderRequest = request.defaults({headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'}
})
var file1 = fs.createWriteStream('Michelin.json');
file1.on('error', function(err) { /* error handling */ });
var arrayOfRequest = []
console.log('Searching for starred restaurants')
for(let i=1;i<35;i++)
{
   
    
    arrayOfRequest.push(customHeaderRequest.get(url+'page-'+i,function(error, response, html){
        var dp = "ds-1col node node--poi view-mode-poi_card node--poi-card node--poi--poi-card clearfix gtm-jsevent-processed" 
            var $ = cheerio.load(html);
        
        $('#panels-content-main-leftwrapper li').each(function(i, elm) {
                if($(this).find('.poi_card-display-title').text() == '')
                    return
                json.name = $(this).find('.poi_card-display-title').text().replace(/(\r\n|\n|\r|          |")/gm,"");
                json.averagePrice = $(this).find('.poi_card-display-price').text().replace(/(\r\n|\n|\r|         |")/gm,"");
                json.Offer = $(this).find('.mtpb2c-offers').text().replace(/(\r\n|\n|\r|       |")/gm,"");
                
                file1.write('{"title" : "' + json.name + '" , "offer" : "' +json.Offer + '" , "price" : "'+json.averagePrice+ '"}\n');
                arrayOfRestaurants.push(json);
    
                
            });

    }))
}

var file2 = fs.createWriteStream('Result.json');
file2.on('error', function(err) { /* error handling */ });
 var arrayOfFourchette = [];

setTimeout(function(){ 
    console.log('searching for Lafourchette equivalence')
    
    var cont = fs.readFileSync("Michelin.json","utf8");
    var contents = cont.split('\n');
    contents.pop();
    contents.forEach(function(elem){
        allJson.push( JSON.parse(elem));
    })
    setTimeout(function(){ 
        
            
            
            each(allJson, function(elem) {
                
                getJSON('https://m.lafourchette.com/api/restaurant-prediction?name='+(elem).title, function(error, response){
                
                
                if(response != undefined)
                    {
                        //console.log(response[0]);
                        OnlyTheOnes.push(response[0]);
                    }
                })
            }, function(error, contents) {
            });
        setTimeout(function(){
            
            each(OnlyTheOnes, function(elem){
                if(elem != undefined)
                    console.log(elem.name + ' has an offer and is starred !')
            })
        }, 10000)
        
    }, 3000); 
}, 10000);


