const express = require('express');
const Cart = require('../models/cart');
const app = express();
app.use(express.json());

const addToCart= async (req, res) => {
    
    console.log(req.user);
    console.log(req.params.id);
    try {
      let cart = await Cart.findOne({ _id:req.user._id });
  
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
        cart = await cart.save().populate('owner').populate('product');
        return res.status(201).json({message:"Added to cart" , cart:newCart});
      } else {
        //no cart for user, create new cart
        const newCart = await new Cart({owner: req.user.id},
          {products: [ {product:req.params._id}, {quantity:req.params.quantity }]
        }).populate('owner').populate('product');
        const savedcart= await newCart.save();
        return res.status(201).json({message:"Added to cart" , cart:newCart});
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
  module.exports ={addToCart};

