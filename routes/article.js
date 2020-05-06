var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');
var editRouter = require('./edit_article');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());
router.use('/edit', editRouter);
router.get('/:articleId', (req, res ,next)=>{
    Articles.findById(req.params.articleId)
    .then((article)=>{
        res.statusCode= 200;
        res.setHeader('Content-type','text/html');
        res.render('article', {
            title: 'Full Article Here',
            art: article
        });
    },(err)=>next(err))
    .catch((err)=>next(err))
     
});

module.exports = router;