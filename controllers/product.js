const express = require('express');
const Product = require('../models/product');
const app = express();
const multer =  require('multer');

app.use(express.json());

const dashboard=async(req,res)=>{
    try {
        const dashproducts = Product.find({owner:req.user.id});
        console.log(dashproducts);
        res.status(200).json({Products:dashproducts});
    } catch (error) {
        res.status(500).json({error});
        
    }
    const dashproducts = Product.find({owner:req.user.id});
    console.log(dashproducts)

}


const newProd = async(req,res)=>{
    try
    {
    const {  productName ,category , description , price , Quantity } = req.body;
    const owner= req.user.id;
    //to make sure none of the inputs are empty
    if( !productName || !category || !description  || !price || !Quantity)
    return res.status(400).json({error: 'Please fill in all the required details'});
    const prod = new Product({ productName ,category , description ,  price ,owner,Quantity });
    
        prod.save();
        res.status(200).json({message:'Succesful' , product:prod});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
};

const prod = async(req,res)=>{
    try{
        let data = await product.find();
        res.send(data); 
    }catch(error){
        res.status(400).json({error:'Error'});
    }

};

const prodName = async(req,res)=>{
    try{
        const data = await product.findOne({productName:req.params.productName});
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }
};

const prodId = async(req,res)=>{
    try{
        const data = await product.findOne({productId:req.params.productId});
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }

};

const prodCat = async(req,res)=>{
    try{
        const data = await product.findOne({ategory:req.params.category});
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }

};

const updateProd = async(req,res)=>{
    try{
        let data = await product.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({message:'Succesfully updated'});
    }catch(error){
        res.status(400).josn({error:'Error'});
    }
};

const deleteProd = async(req,res)=>{
    try{
        const data = await product.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }

}; 




module.exports= {
    newProd,
    prod,
    prodName,
    prodId,
    prodCat,
    updateProd,
    deleteProd,
    dashboard
    

}
