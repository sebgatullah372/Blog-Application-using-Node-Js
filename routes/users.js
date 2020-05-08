var express = require('express');
var User = require('../models/user');
const { check, validationResult } = require('express-validator');
const bodyparser = require('body-parser');
var bcrypt = require('bcryptjs');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.get('/signup', (req, res ,next)=>{
  res.render('signup_form', {
      title: 'Sign Up Here'
  })
})

router.post('/signup',
  [check('firstname', 'Firstname is Required').not().isEmpty(),
  check('lastname', 'Lastname is Required').not().isEmpty(),
  check('email', 'Email is Required').not().isEmpty(),
  check('email', 'Enter a valid Email').isEmail(),
  check('username', 'Username is Required').not().isEmpty(),
  check('password', 'Password is Required').not().isEmpty(),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
  .matches(/\d/).withMessage('Password must contain a number'),
  check('conpass', 'Confirmation of Password is Required').not().isEmpty()
  ],(req, res, next)=> {
    const errors = validationResult(req);
    var err = errors.errors;
    //console.log(err);
    if (err.length == 0) {
      //console.log('Here');
      
    var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password= hash;
      //console.log(hash);
      User.create(req.body)
      .then((users)=>{
        //console.log(users);
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');  
       req.flash('success', "You have Signed Up!!");
       res.redirect('/users/signup'); 
          
       },(err)=>next(err))
       .catch((err)=>next(err));
    }
    
      
      /*bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash){
          if(err){
            throw err;
          }
          hashpassword = hash;
          return hashpassword;
      });
      
       
     });*/
      else{
        res.render('signup_form', {
          title: 'Sign Up Here',
          errors: err
      });
      }
      
    
    
});

router.get('/login', (req, res ,next)=>{
  res.render('login_form', {
      title: 'Log in Here'
  });
});
module.exports = router;