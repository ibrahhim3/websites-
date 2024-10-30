const MongoDB = require("mongoose");

const UserSchema = MongoDB.Schema( 
    {
        Username : {
            type : String ,
            required : true ,
            unique : true ,
        } ,
        Email : {
            type : String ,
            required : true ,
            unique : true ,
        } ,
        Password : {
            type : String ,
            required : true ,
            unique : true ,
        } , 
        Name : {
            type : String ,
            required : true ,
        } ,
        Surname : {
            type : String ,
            required : true ,
        } ,
        Date_of_Birth : {
            type : Date ,
            required : true ,
        } ,
        Gender : {
            type: String,
            enum: ['Male', 'Female'],
            required: true,
        }
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;