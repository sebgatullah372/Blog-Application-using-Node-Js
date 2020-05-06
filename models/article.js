const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String
    },
    author:{
        type: String
    },
    body:{
        type: String
    } 
});

var Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;