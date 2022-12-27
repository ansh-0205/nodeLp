const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const userRoute = require('./routes/user');
const prodRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


const db = process.env.mongo_url;

app.use(express.json());
app.use(morgan('tiny'));


mongoose.connect(
    "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Success"))





app.use('/product',prodRoute);


app.use('/user',userRoute);

app.use('/cart',cartRoute);

app.use('/order' , orderRoute);

app.use((req,res,next)=>{
    // res.status(404).send('Error');
});
module.exports=app;