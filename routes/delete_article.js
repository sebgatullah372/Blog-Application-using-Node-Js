var express = require('express');
var Articles = require('../models/article');
const bodyparser = require('body-parser');
var router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use(bodyparser.json());

router.delete('/:articleId', (req,res,next)=>{
    const id = req.params.articleId;
    console.log(id);
    let query = {_id: id}
    Articles.remove(query)
    .then((articles)=>{
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        //res.json(articles);
        res.send('Deleted');      
    },(err)=>next(err))
    .catch((err)=>next(err));
})
module.exports = router;