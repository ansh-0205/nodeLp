const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    

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
    images :[ {
    data: Buffer,
    contentType:String
   
}],
    price : {
    type: Number,
    required: true,
},
},{timestamps:true}
);

const product = mongoose.model('product',productSchema);
module.exports=product;


