const mongoose = require("mongoose");

const Order = new mongoose.Schema(
    {

    }
) ;

module.exports = mongoose.model("Order",Order);