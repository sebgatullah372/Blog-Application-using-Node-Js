var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');
const { check, validationResult } = require('express-validator');

//var flash = require('connect-flash');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.get('/add', (req, res ,next)=>{
     res.render('add_article', {
         title: 'Add Article'
     })
})


router.post('/add', [check('title', 'Title is Required').not().isEmpty(),
check('author', 'Author is Required').not().isEmpty(),
check('body', 'Body is Required').not().isEmpty()
],(req, res, next)=> {
  const errors = validationResult(req);
  var err = errors.errors;
  //console.log(err);
  //console.log(err.length);
  if (err.length == 0) {
    
   //console.log('if');
  // return;
  Articles.create(req.body)
  .then((articles)=>{
    
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      //res.json(articles);
      req.flash('success', "New Article Added");
      res.redirect('/');      
  },(err)=>next(err))
  .catch((err)=>next(err));
  }
  else{
    //console.log('else');
    res.render('add_article', {
      title: 'Add Article',
      errors: err
  });
  }
   
  

  //console.log('Here');
});
//5eb0310f5681c35171d79b57
module.exports = router;