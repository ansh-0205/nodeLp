const express = require('express');
const Product = require('../models/product');
const multer =  require('multer');
const cloudinary =  require('cloudinary');
const app = express();
const dotenv = require('dotenv');
const User = require('../models/user');
const fs = require('fs');
const { findByIdAndUpdate } = require('../models/user');

dotenv.config();


app.use(express.json());
cloudinary.config(
    { 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
    }
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});





const upload = multer({storage:storage});


const addProfile = async(req,res)=>{

    try
    {
        console.log(req.file);

        // const file = dataUri(req).content;
        // const result = await cloudinary.v2.uploader.upload(file);
        
         const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        console.log(req.user);
        fs.unlinkSync(req.file.path);
        const newUser = await User.findByIdAndUpdate({_id:req.user._id} , {profilePic:result.secure_url} ,{new:true});
        console.log(newUser);
        // req.user.profilePic = result.secure_url;
        // await User.save();
        return res.status(200).json({
            message: 'profile picture added',
            User: newUser,
          });
        
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}
module.exports={upload, addProfile};