const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.mongo_url;

mongoose.connect( "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log('no connection'));