const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user');

const auth = async(req,res,next)=>{
    try{
        const header = req.headers['auth'];
        if(header){
            const token = header.split(' ')[1];
            const verifiedToken = jwt.verify(token,process.env.accessToken);
            const user=await User.findOne({email:verifiedToken.email});
            req.user=user;
          
            next();
        }
        else
        {
            res.status(400).send('Invalid Req');
        }
    }catch(error){
        res.status(400).json({error:'Error'});
    }
}
const admin = async(req,res,next)=>{
    try{
       
            if(User.roles=== 'admin'){
               next();
           }
           else
           {
               return res.status(400).json({message :'Not admin'});
           }
        }catch(error){
          return res.status(400).json({error:'Error 404'});
        }
}


module.exports={auth,admin};
