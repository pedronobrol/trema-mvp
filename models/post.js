
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var PostSchema = new mongoose.Schema({
    language: 
    {
        type: String,
        enum: ['Spanish', 'Portuguese', 'English'],
        required: true,
    },
    companyName: 
    {
        type: String,
        required: true,
    },
    keywords: [{type: String}],
    location: String,
    audience: [{type: String}],
    emoji:{
        type: Boolean,
        default: false 
    },
    funny: {
        type: Boolean,
        default: false,
    },
    question: {
        type: Boolean,
        default: false,
    },
    hashtag: {
        type: Boolean,
        default: false,
    },
    output: String,
    modifiedOutput: String, 
    liked: Boolean,
    });

module.exports = mongoose.model("Post", PostSchema);