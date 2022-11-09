const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const user = require('../models/user');

app.use(express.json());

// for user to register 
const newuser = async(req,res)=>{
    
        const {roles,name,email,password}=req.body;
    if(!roles || !name || !email || !password)
    return res.status(400).json({error:'Enter required details'});
        const oldUser = await user.findOne({email});
        if(oldUser)
        {
            res.status(400).json({message: 'Try to login as this email has already been registered !!'});
        }
        try{
            const User = new user(req.body);
            await User.save();
            res.status(200).json(User);
       }catch (error) {
        return res.status(400).json({error:'Error'});
    }
};



const userLogin =async(req,res)=>{
        try{
            const {email,password} = req.body;
            const validEmail =  await user.findOne({email:req.body.email});
            
            if(validEmail)
            {
                
                const hashedPassword = await bcrypt.hash(validEmail.password,10);
                const validPassword = await bcrypt.compare(password,validEmail.password);
                
                if(validPassword)
                {
                    const token = jwt.sign({email:req.body.email},process.env.accessToken,{expiresIn:'1d'});
                    return res.status(200).header('auth',token).send({
                        user: validEmail,
                        token:token
                    });
                    
                }
                else
                {
                    res.status(400).json({message:'Incorrect e-mail or password '});
                }
            }
            else
            {
                res.status(400).json({message:'Incorrect e-mail or password'});
            }
        }catch(error){
        res.status(400).json({error:'Error'});
    }
};


const users = async(req,res)=>{
    try{
        let data = await user.find();
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
    userLogin,
    users,
    userName,
    userRoles,
    updateUser,
    deleteUser
};