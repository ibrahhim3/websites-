const mongoose = require("mongoose");

const Address = new mongoose.Schema(
    {
        UserID : String ,
        Country : String ,
        City : String ,
        Full_Address : String ,
        ZIPCode : String ,
        PhoneNumber : String ,
        DescriptionNotes : String ,
    } ,
    { timestamps: true }
) ;

module.exports = mongoose.model("Address",Address);