var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');
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
router.get('/:articleId',verifyUser, (req, res ,next)=>{
    Articles.findById(req.params.articleId)
    .then((article)=>{
        if(article.author != req.user._id){
            req.flash('danger', 'Not Authorized!!');
            res.redirect('/');
        }
        res.statusCode= 200;
        res.setHeader('Content-type','text/html');
        res.render('edit_article', {
            title: 'Edit your Article Here',
            art: article
        });
    },(err)=>next(err))
    .catch((err)=>next(err));
     
})
/*.put('/:articleId', (req, res, next)=> {
    console.log(req.body);
    Articles.findByIdAndUpdate(req.params.articleId, {$set: req.body}, {new: true})
    .then((articles)=>{
        articles.save();
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.json(articles);
        res.redirect('/article/edit');      
    },(err)=>next(err))
    .catch((err)=>next(err));

})*/
.post('/:articleId', verifyUser, (req, res, next)=> {

    var article = {};
    article.title = req.body.title;
    article.body = req.body.body;
    var query = {_id: req.params.articleId}
    Articles.update(query , article)
    .then((articles)=>{
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        //res.json(articles);
        req.flash('success', "Article Updated!");
        res.redirect('/');      
    },(err)=>next(err))
    .catch((err)=>next(err));
  
  });

module.exports = router;