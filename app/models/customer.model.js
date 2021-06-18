const mongoose = require("mongoose");

const Customer = mongoose.model(
    'Customer',
    new mongoose.Schema({
        name:String,
        phone:Number,
        email:String,
        city:String,
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = Customer;