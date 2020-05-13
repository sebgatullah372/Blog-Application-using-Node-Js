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
router.delete('/:articleId',verifyUser, (req,res,next)=>{
    if(!req.user._id){
        res.status(500).send();
    }
    const id = req.params.articleId;
    console.log(id);
    let query = {_id: id}
    Articles.findById(id)
    .then((article)=>{
        if(article.author!=req.user._id){
            res.status(500).send();
        }
        else{
            Articles.remove(query)
            .then((articles)=>{
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/html');
                //res.json(articles);
                req.flash('danger', "Article Deleted");
                res.send('Deleted');      
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
    
})
module.exports = router;