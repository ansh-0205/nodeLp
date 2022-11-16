const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const userRoute = require('./routes/user');
const prodRoute = require('./routes/product');
const cartRoute = require('./routes/cart');


const db = process.env.mongo_url;

app.use(express.json());
app.use(morgan('tiny'));


mongoose.connect(
    db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Success"))
.catch((err) => console.log(err));




app.use('/product',prodRoute);


app.use('/user',userRoute);

app.use('/cart' , cartRoute);

app.use((req,res,next)=>{
    res.status(404).send('Error');
});
app.listen(3000 ,()=>{
    console.log('Connected to Port 3000');
});
