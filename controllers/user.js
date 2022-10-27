const express = require('express');
const app = express();
const router = express.Router();


const user = require('../models/user');

app.use(express.json());

const newuser = async(req,res)=>{
    const {roles,name,email,password}=req.body;
    if(!roles || !name || !email || !password)
    return res.status(400).json({error:'Enter required details'});
    const User = new user(req.body);
    try{
        await User.save();
        res.status(200).json({message:'Succesful'});
    }catch (error) {
        res.status(400).json({error:'Error'});
    }
};

const users = async(req,res)=>{
    try{
        const data = await user.find();
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }
  
};

const userName = async(req,res)=>{
    try{
        const data = await user.findOne({Name:req.params.Name});
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }

};

const userRoles = async(req,res)=>{
    try{
        const data = await user.findOne({roles:req.params.roles});
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }
 
};

const updateUser = async(req,res)=>{
    try{
        let data = await user.findByIdAndUpdate(req.params.name,req.body);
        res.status(200).json({message:'Successfully Updated'});
    }catch(error){
        res.status(400).json({error:'Error'});
    }
};

const deleteUser = async(req,res)=>{
    try{
        const data = await user.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    }catch(error){
        res.status(400).json({error:'Error'});
    }

};



module.exports = {
    newuser,
    users,
    userName,
    userRoles,
    updateUser,
    deleteUser
};