const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
    {
        UserID : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "User" ,
            required : true
        } ,
        Items : [ {
            ProductID : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : "Product" ,
                required : true
            } ,
            Quantity : {
                type : Number ,
                required : true ,
                min : 1
            } ,
        } ,
        ]
    } ,
    { timestamps: true }
) ;

module.exports = mongoose.model("Cart",Cart);