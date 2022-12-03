const express = require('express');
const Cart = require('../models/cart');
const User =  require('../models/user');
const app = express();
app.use(express.json());

const addToCart= async (req, res) => {
    
    console.log(req.user);
    console.log(req.params.id);
    try {
      let cart = await Cart.findOne({ owner:req.user._id });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.product == req.params.id);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = req.params.quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push( {product:req.params.id}, {quantity:req.params.quantity });
        }
        cart = await cart.save();
        return res.status(201).json({message:"Added to cart" , cart:cart});
      } else {
        //no cart for user, create new cart
        const newCart = await new Cart({owner: req.user.id},
          {products: [ {product:req.params._id}, {quantity:req.params.quantity }]
        }).populate('owner');
        const savedcart= await newCart.save();
        return res.status(201).json({message:'Added to cart' , cart:newCart});
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Something went wrong');
    }
  };

  const viewCart= async(req,res)=>{
    try
    {
    const userCart= Cart.findOne({owner:req.user._id});
    if(!userCart)
    {
      return res.status(500).json({message:'Nothing is added to cart'});
    }
    const populatedCart= userCart.populate('owner').populate(userCart.product.products);

    res.status(200).json({cart: populatedCart});
    } 
    catch(err)
    {
      res.status(400).json({message:err.message});
    }

  }


  const deleteitem = async(req,res)=>{

try{
    let cart = await Cart.findOne({ owner:req.user._id });
    if(cart)
    {
      let itemIndex = cart.products.findIndex(p => p.product == req.params.id);
      if (itemIndex > -1)//product exists
      {
        if(cart.products[itemIndex].quantity==1)
        {
          //only one item exists delete it
          cart.products.splice(itemIndex ,1);
          return res.status(200).json({message:`Deleted Item  ${cart.products[itemIndex]}`});
        }
        else
        {
          //Multiple items exist ,reduce quantity
          cart.products[itemIndex].quantity-=1;
          return res.status(200).json({message:`1 item removed, ${cart.products[itemIndex].quantity} remaining`});
        }

      }
      else//product does not exist in cart
      {

        return res.status(500).json({message:'Requested product not in cart'});
      }

    }   
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }

  
  }
  module.exports ={addToCart , viewCart ,deleteitem};

