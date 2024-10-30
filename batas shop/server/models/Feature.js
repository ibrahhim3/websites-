const mongoose = require("mongoose");

const Feature = new mongoose.Schema(
    {
        Image : String 
    } , 
    { timestamps : true }
) ;

module.exports = mongoose.model("Feature",Feature);