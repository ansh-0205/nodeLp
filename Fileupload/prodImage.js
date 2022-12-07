const express = require('express');
const Product = require('../models/product');
const multer =  require('multer');
const app = express();

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const addImage = async(req,res)=>{

    try
    {
        
        const reqProduct= await Product.findById(req.params._id);
        console.log(reqProduct);
        // console.log(req.body);
        console.log(req.files);
        var img = [];
        req.files.map((file)=>{
            var image = { data: Buffer.from(file.buffer).toString('base64'), contentType: file.mimetype };
            img.push(image)
            

        });
        console.log(img);
        const productImage= await Product.findByIdAndUpdate({_id:req.params.id} ,{images:img} ,{new:true});
        res.status(201).send({productImage});
    }
    catch(error)
    {
        res.status(500).send({message:error.message});
    }
}
module.exports={upload, addImage}