const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.mongo_url;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log('no connection'));