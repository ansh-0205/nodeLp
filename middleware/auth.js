const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async(req,res,next)=>{
    try{
        const header = req.headers['auth'];
        console.log(header);
        if(header){
            const token = header.split(' ')[1];
            const verifiedToken = jwt.verify(token,process.env.accessToken);
            req.user=verifiedToken;
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

module.exports={auth};
