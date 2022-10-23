const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId:{type: Number,
    required: true,
    unique: [true,'That product Id is already taken']},

    productName:{
    type: String,
    required: true,
    },

    category : { 
    type: String,
    required: true,
},
    description : {
    type: String,
    required: true,
},
    image : {
    type: String,
    required: true,
},
    price : {
    type: Number,
    required: true,
},
});

const product = mongoose.model('product',productSchema);
module.exports=product;


