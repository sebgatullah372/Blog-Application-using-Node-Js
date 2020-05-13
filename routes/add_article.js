var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');

const { check, validationResult } = require('express-validator');

//var flash = require('connect-flash');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());
var verifyUser = (req, res, next)=>{
  if(req.isAuthenticated()){
      return next();
  }
  else{
      req.flash('danger', 'Please Login');
      res.redirect('/users/login');
  }
}

router.get('/add', verifyUser, (req, res ,next)=>{
     res.render('add_article', {
         title: 'Add Article'
     })
})


router.post('/add', verifyUser, [check('title', 'Title is Required').not().isEmpty(),
//check('author', 'Author is Required').not().isEmpty(),
check('body', 'Body is Required').not().isEmpty()
],(req, res, next)=> {
  const errors = validationResult(req);
  var err = errors.errors;
  //console.log(err);
  //console.log(err.length);
  if (err.length == 0) {
    
   //console.log('if');
  // return;
  req.body.author = req.user._id;
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



module.exports = router;