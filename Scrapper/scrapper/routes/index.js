var express = require('express');
var router = express.Router();
var tools = require('/public/javascripts/scrapMichelin.js')

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {
    title: 'WebScrapper',
    path : '/index.jade'
  });
});


module.exports = router;
