const express = require('express');
const app = express();
const router = express.Router();
const url = "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test";
//MongoClient allows making connections with mongodb
const {MongoClient} = require('mongodb');
const c = new MongoClient(url);

require('../dbConnect');
const product = require('../models/product');

app.use(express.json());
async function dbConnect()
{
    let response = await c.connect();
    let db = response.db('TestDB');
    return db.collection('product');
}

//to add products to the db
router.post("/newProd",(req,res)=>{
    const {productId,productName ,category , description , image , price } = req.body;
    //to make sure none of the inputs are empty
    if(!productId || !productName || !category || !description || !image || !price)
    return res.json({error: 'Please fill in all the required details'});
    const prod = new product({productId, productName ,categories , description , image , price })
    prod.save().then(()=>res.json({message:'Successful'})
    ).catch((err)=>res.json({error: 'Error'}));
});

//to get products  (to get all prod , prod with specific name , prod with specific Id,prod under specific category)
router.get("/prod",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
});
router.get("/prodName",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find({productName:req.params.productName}).toArray();
    res.send(data);
});
router.get("/prodId",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find({productId:req.params.productId}).toArray();
    res.send(data);
});
router.get("/prodCat",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find({category:req.params.category}).toArray();
    res.send(data);
});

//to update the db
router.put("/",async(req,res)=>{
    let data = await dbConnect();
    let response = await data.updateOne({
        productId:req.body.productId,
        $set : req.body,
    })
    res.send(response);
    let newData = await data.find({productId:req.params.productId}).toArray();
    res.send(newData);
});
//to delete a prod from the db
router.delete("/",async(req,res)=>{
    let data = await dbConnect();
    let response = await data.deleteOne({
        productId:req.body.productId
    });
    res.send(response);
});

router.use((req,res,next)=>{
    res.json({error:'Not Found'});
});

app.use(router);
app.listen(3000);
console.log("Server running on port 3000");

module.exports=router;


