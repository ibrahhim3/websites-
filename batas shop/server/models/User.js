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
        isActive: { // New field to track account activation
            type: Boolean,
            default: false,
          },
        verificationCode: {
            type: String,
            default: null,
          },
        verificationCodeExpires: {
            type: Date,
            default: null,
          },
        resetToken: { // Field for password reset token
            type: String,
            default: null,
        },
        resetTokenExpires: { // Field to track when the reset token expires
            type: Date,
            default: null,
        },
    });


const User = mongoose.model("User", UserSchema);
module.exports = User;