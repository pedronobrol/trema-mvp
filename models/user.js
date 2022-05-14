
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    credits: {
        type: Number,
        default: 5,
    }
});

module.exports = mongoose.model("UserToken", UserSchema);