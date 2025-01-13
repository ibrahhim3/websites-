const mongoose = require("mongoose") ;

const Review = new mongoose.Schema( 
    {
        ProductID : String ,
        UserID : String ,
        Username : String ,
        Message : String ,
        Value_1_to_5 : Number ,
    } ,
    { timestamps: true }
) ;

module.exports = mongoose.model("Review",Review);