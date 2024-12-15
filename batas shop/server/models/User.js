const mongoose = require("mongoose");

const UserSchema = mongoose.Schema( {
        userName : {
            type : String ,
            required : true ,
            unique : true ,
        } ,
        email : {
            type : String ,
            required : true ,
            unique : true ,
        } ,
        password : {
            type : String ,
            required : true ,
            unique : true ,
        } , 
        role :{
            type: String,
            default: 'user',
        },
        isActive: {
            type: Boolean,
            default: false, // User is inactive until they activate their account
        },
    });


const User = mongoose.model("User", UserSchema);
module.exports = User;