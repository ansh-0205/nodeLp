const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    roles: {
    type: String,
    required: true
},

    name: {
    type: String,
    required: true
},

    email: {
    type: String,
    required: true
},

    password:{
    type: String,
    required: true
},

});


const user=mongoose.model('User',userSchema);
module.exports=user;
