var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.get('/add', (req, res ,next)=>{
     res.render('add_article', {
         title: 'Add Article'
     })
})
.post('/add', (req, res, next)=> {
  Articles.create(req.body)
  .then((articles)=>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      //res.json(articles);
      res.redirect('/articles/add');      
  },(err)=>next(err))
  .catch((err)=>next(err));

});
//5eb0310f5681c35171d79b57
module.exports = router;