const mongoose = require("mongoose") ;


const Product = new mongoose.Schema (
    {
        Name : String ,
        Category : String ,
        Description : String ,
        Brand : String ,
        Image : String ,
        Price : Number ,
        StockValue : Number ,
        Review : Number ,
    } ,
    { timestamps : true }
) ;

module.exports = mongoose.model("Product",Product);