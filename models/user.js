const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    roles: {
    type: String,
    required:true,
    enum:['buyer','seller']
},

    name: {
    type: String,
    required:true,
},

    email: {
    type: String,
    required:true,
    unique:[true,'e-mail exists'],
    lowercase:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Inavlid e-mail')
        }
    }

},

    password:{
    type: String,
    required:true,
},

},{timestamps:true}
);


const user=mongoose.model('user',userSchema);
module.exports=user;
