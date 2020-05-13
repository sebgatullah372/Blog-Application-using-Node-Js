var express = require('express');
var Articles = require('../models/article');
var User = require('../models/user');
const bodyparser = require('body-parser');
var editRouter = require('./edit_article');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());
router.use('/edit', editRouter);
router.get('/:articleId', (req, res ,next)=>{

    Articles.findById(req.params.articleId)
    .then((article)=>{
        console.log(article.author);
        User.findById(article.author)
        .then((user)=>{
            //console.log(user.firstname);
            res.statusCode= 200;
            res.setHeader('Content-type','text/html');
            res.render('article', {
                title: 'Full Article Here',
                art: article,
                author: user.firstname
            });
    
        },(err)=>next(err))
        .catch((err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err))
     
});

module.exports = router;