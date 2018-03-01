function michelinScrapper(){
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
            var json = { name : "", offers : "", price : ""};
            
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
}

function LafourchetteScrapper(){
    // The URL we will scrape from - in our example Anchorman 2.

    url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/';
    url2 = "https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true"
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    
    var arrayOfRestaurants = [];
    
    
    for(i=1;i<5;i++)
    {
        request(url3+i, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { name : "", offers : "", price : "", address :""};
            
            $('resultItem-name').filter(function(){
                var data = $(this);

                name = data.children().first().text();

           // Once we have our title, we'll store it to the our json object.

                json.title = title;
            })
            $('resultItem-saleType resultItem-saleType--specialOffer').filter(function(){
                var data = $(this);

                offers = data.children().first().text();

           // Once we have our title, we'll store it to the our json object.

                json.title = title;
            })
            $('resultItem-averagePrice').filter(function(){
                var data = $(this);

                priceRange = data.children().first().text();

           // Once we have our title, we'll store it to the our json object.

                
            })
            $('resultItem-address').filter(function(){
                var data = $(this);

                address = data.children().first().text();

           // Once we have our title, we'll store it to the our json object.

                
            })
            json.title = title;
            json.offers = offers;
            json.price = priceRange;
            json.address = address;
            arrayOfRestaurants.push(json);
            
        }
            
    })
           
    }
    console.log(JSON.stringify(arrayOfRestaurants)); 
}
