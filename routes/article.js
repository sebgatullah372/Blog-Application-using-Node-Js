var express = require('express');
var Articles = require('../models/article');
var User = require('../models/user');
const bodyparser = require('body-parser');
var editRouter = require('./edit_article');
const { check, validationResult } = require('express-validator');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());
router.use('/edit', editRouter);
var verifyUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('danger', 'Please Login');
        res.redirect('/users/login');
    }
  }
router.get('/:articleId', (req, res ,next)=>{
        
    Articles.findById(req.params.articleId)
    .then((article)=>{
        //console.log(article.author);
        //console.log(article.comments);
        //console.log(article.comments.length);
        
        User.findById(article.author)
        .then((user)=>{
            res.statusCode= 200;
            res.setHeader('Content-type','text/html');
            //console.log('len',article.comments);
            if(article.comments.length !=0){
            const getUserDetails = (userIds, callback) => {
                let writer = [];
                let counter = 0;
                for(var i = 0; i<userIds.length;i++){
                    var writers = userIds[i].writer;
                    //console.log(writers);
                    
                    User.findById(writers)
                    .then((writers)=>{
                        writer.push(writers.firstname);
                        //writer.save();
                        //console.log(writers.firstname);
                        //return writer;
                        
                        counter++;
                        
                        if(counter == userIds.length){
                            return callback(writer);
        
                        }
        
                    })
                  
                    
                     
                }
            }
            //console.log('hereeeeeee') 
            getUserDetails(article.comments, (users) => {
                //console.log(users);
                res.render('article', {
                    title: 'Full Article Here',
                    art: article,
                    author: user.firstname,
                    writers: users,
                    comments: article.comments
    
                     
                });
            });
            
            
        }
        else{
            users = [];
            res.render('article', {
                title: 'Full Article Here',
                art: article,
                author: user.firstname,
                writers: users,
                comments: article.comments

                 
            });

        }  
            
        
    
        },(err)=>next(err))
        .catch((err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err))
     
});
router.post('/:articleId/comment', verifyUser, [
    check('comment', 'You can not post Blank Comment').not().isEmpty()
    ],(req, res, next)=> {
      const errors = validationResult(req);
      var err = errors.errors;
      //console.log(err);
      //console.log(err.length);
      if (err.length == 0) {
          
      Articles.findById(req.params.articleId)
      .then((article)=>{
          if(article != null){
            req.body.writer = req.user._id;
            article.comments.push(req.body);
            article.save()
            .then((comment)=>{
                res.statuscode = 200;
                res.setHeader('Content-type', 'text/html');
                req.flash('success', "New Comment Added");
                res.redirect('/article/'+req.params.articleId); 
            })
          }
      })
     
      }
      else{
        //console.log('else');
        //console.log(err.msg);
        req.flash('danger', 'You can not post Blank Comment');
        res.redirect('/article/'+req.params.articleId); 
      }
       
      
    
      //console.log('Here');
    });

module.exports = router;