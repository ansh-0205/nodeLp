const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    categories : { type: String},
    description : {type: String},
    image : {type: String},
    price : {type: Number},
});

