var express = require('express');
var Articles = require('../models/article');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Articles.find({})
  .then((articles)=>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.render('index', { title: 'Articles', articles: articles });      
  },(err)=>next(err))
  .catch((err)=>next(err));
});

module.exports = router;
