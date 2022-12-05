const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')
const dotenv = require('dotenv');
const transporter =  require('../config/mail');
const User = require('./user');
const orderSchema =  new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    totalPrice:
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
orderSchema.post('save' , async function(doc , next){

       //console.log((doc.user.id).toString('base64')) 
       console.log(this.user._id.toString());
       console.log('Your document is' ,doc);
    const user = await User.findById({_id:this.user._id.toString()});
     console.log(user);
        const info = await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:user.email,
            subject:'Order Created',
            text:'Your order was placed successfully'
    
        });
        console.log(info);
        
        next();
    });
const order = mongoose.model('order' ,orderSchema);
module.exports= order;