const express = require('express');
const Product = require('../models/product');
const multer =  require('multer');
const cloudinary =  require('cloudinary').v2;
const app = express();
const dotenv = require('dotenv');
const user = require('../models/user');


dotenv.config();


app.use(express.json());
cloudinary.config(
    { 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
    }
);

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const addProfile = async(req,res)=>{

    try
    {
        console.log(req.file);
        
        const result = await cloudinary.v2.uploader.upload(Buffer.from(req.file.buffer).toString('base64'));
        console.log(result);
        req.user.profilePic = result.secure_url;
        await user.save();
        return res.status(200).json({
            success: true,
            file: result.secure_url,
          });
        
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}
module.exports={upload, addProfile};