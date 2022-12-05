const express = require('express');
const app = express();
app.use(express.json());

const User=require('../models/user');
const Product=require('../models/product');
const Order=require('../models/order');
const Cart = require('../models/cart');


const directOrder=async(req,res)=>{
    try {
       
        console.log(req.params.Quantity);
        const product=await Product.findById(req.params.prodID);
        console.log(product);
        if(req.params.Quantity>product.Quantity)
       { 
        return res.status(200).json({message:`Only ${product.Quantity} Items are available`});
       }

       const price=product.price*(Number(req.params.Quantity));
       console.log(price);
        const order=new Order({
            user:req.user.id,
            totalPrice:price,
            product:req.params.prodID
        });
        product.Quantity-=req.params.Quantity;
        product.save();
        order.save();
        res.status(200).json({order});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const orderCart = async(req,res)=>{
    try
    {
    
    let price=0;
    const cart =  await Cart.findOne({owner:req.user.id})
                        .populate('owner').populate('products.product');
    // console.log(cart.products);
    if(!cart || !cart.products )
    {
       return res.status(500).send('You do not have anything in your cart');
    }

    cart.products.forEach(item => {
        // console.log(item.quantity);
        // console.log(item.product.price);
        price+=(Number(item.product.price))*(Number(item.quantity));
        // console.log(price)
    });
    const cartOrder =  new Order({
        user:req.user.id,
        cart:cart.id,
        totalPrice:price
    });
    console.log(cartOrder);
    async function reducequantity(cart){
        try{
        let newquantity;
        for (item of cart.products)
        {
            // console.log(item);
            var prod = await Product.findById(item.product);
          
            prod.Quantity-=(Number(item.quantity));
            await prod.save();
        }
        }
        catch(err)
        {
            return res.status(500).json({message:err.message});
        }
    }
    reducequantity(cart);

    const savedorder = await cartOrder.save();
    console.log('saved order is' , savedorder);
    return res.status(200).json({order:savedorder});
    }
    catch(err)
    {
        return res.status(400).json({message:err.message});
    }
}
 
const showOrders = async(req,res)=>{
    try 
    {
        const userOrder = await Order.findOne({user:req.user._id})
        .populate('product')
        .populate({
            path:'cart' ,
            populate:[
            {path:'products.product'},
            {path:'owner' , select: 'name roles email'}
            ]
    });
        res.status(200).json({orders:userOrder});
        
    } 
    catch (error)
    {
        res.status(400).json({message:error.message});
    }
}
module.exports = {directOrder , orderCart ,showOrders};