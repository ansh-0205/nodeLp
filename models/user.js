const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();
const userSchema = new mongoose.Schema({
    roles: {
    type: String,
    required:true,
    enum:['buyer','seller','admin']
},

    name: {
    type: String,
    required:true,
},

    email: {
    type: String,
    required:true,
    // unique:[true,'e-mail exists'],
    // lowercase:true,
    
    // validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error('Inavlid e-mail')
    //     }
    // }

},

    password:{
    type: String,
    required:true,

},

},{timestamps:true}
);
userSchema.post('save',function(doc,next){
    console.log('New User created ',doc);
    next();
})


userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,9)
    }
    next();
});


const user=mongoose.model('user',userSchema);
module.exports=user;
