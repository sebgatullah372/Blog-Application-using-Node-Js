const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: {
        type: String
    },
    writer:{
        type: String
    }
})
const articleSchema = new Schema({
    title: {
        type: String
    },
    author:{
        type: String
    },
    body:{
        type: String
    },
    comments:[commentSchema] 
});

var Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;