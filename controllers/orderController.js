const User=require('../models/user');
const Product=require('../models/product');
const Order=require('../models/order');
const Cart = require('../models/cart');


const directOrder=async(req,res)=>{
    try {
       
        const product=await Product.findById(req.params._id);
        if(req.params.Quantity>product.Quantity)
        return res.status(200).json({message:`Only ${product.Quantity} Items are available`});

       const price=product.price*(Number(req.params.Quantity));
        const order=new Order({
            user:req.user._id,
            totalPrize:price,
            product:req.params._id
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
    {const cart =  Cart.findOne({owner:req.user._id});
    if(!cart || !cart.products)
    {
       return res.status(500).send('You do not have anything in your cart');
    }
    const order = new Order({
        user:req.user._id,
        cart:cart._id
    });
    cart.products.forEach(item => {
        item.product.Quantity -= item.quantity
    });
    await order.save();
    res.status(200).send(order);
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}
 
const showOrders = async(req,res)=>{
    try 
    {
        const userOrder = Order.findOne({user:req.user._id});
        const detailOrder =  userOrder.populate('product')
        .populate({
            path:'cart' ,
            populate:[
            {path:'products.product'},
            {path:'owner'}
            ]
    });
        res.status(200).json({orders:detailOrder});
        
    } 
    catch (error)
    {
        res.status(400).json({message:error.message});
    }
}
module.exports = {directOrder , orderCart ,showOrders};