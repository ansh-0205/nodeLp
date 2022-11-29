const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')
const orderSchema =  new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    price:
    {
        type:Number,
        required :true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    cart:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart'

    },
    createdOn:{
        type:Date ,
        default: Date.now
    }
},{Timestamps:true}
)