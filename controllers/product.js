const express = require('express');
const Product = require('../models/product');
const app = express();
const multer =  require('multer');

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const addImage = async(req,res)=>{

    try
    {
        
        const reqProduct= await Product.findById(req.params.id);
        console.log(reqProduct);
        console.log(req.body);
        console.log(req.file);
       
        const image = { data: req.file.buffer, contentType: req.file.mimetype };
        const productImage= await Product.findByIdAndUpdate(req.params.id ,{images:image[0]} ,{new:false});
        res.status(201).send({productImage});
    }
    catch(error)
    {
        res.status(500).send(error);
    }

}

const newProd = async(req,res)=>{
    const {  productName ,category , description , image , price } = req.body;
    //to make sure none of the inputs are empty
    if( !productName || !category || !description  || !price)
    return res.status(400).json({error: 'Please fill in all the required details'});
    const prod = new Product({ productName ,category , description , image , price });
    try{
        prod.save();
        res.status(200).json({message:'Succesful'});
    }catch(error){
        res.status(400).json({error:'Error'});
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
    upload,
    addImage

}
