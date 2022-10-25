const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongo_url="mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test";

mongoose.connect(
    mongo_url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Success"))
.catch((err) => console.log(err));

const prodroute = require('../routes/product');
app.use('/api/product',prodroute);

const userroute = require('../routes/user');
app.use('/api/user',userroute);
