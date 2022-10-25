const express = require('express');
const app = express();
const router = express.Router();
const url = "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test";
//MongoClient allows making connections with mongodb
const {MongoClient} = require('mongodb');
const c = new MongoClient(url);
async function dbConnect(){
    let res = await c.connect();
    let db = res.db('test');
    return db.collection('product');
}

const product = require('../models/product');

app.use(express.json());

//to add products to the db
router.post("/newProd",async(req,res)=>{
    const { productId , productName ,category , description , image , price } = req.body;
    //to make sure none of the inputs are empty
    if(!productId || !productName || !category || !description || !image || !price)
    return res.json({error: 'Please fill in all the required details'});
    const prod = new product({productId, productName ,category , description , image , price })
    prod.save().then(()=>res.json({message:'Successful'})
    ).catch((err)=>res.json({error: 'Error'}));
});

//to get products  (to get all prod , prod with specific name , prod with specific Id,prod under specific category)
router.get("/prod",async(req,res)=>{
    const data = await product.find();
    res.send(data); 
});
router.get("/prodName",async(req,res)=>{
    const data = await product.findOne({productName:req.params.productName});
    res.send(data);
});
router.get("/prodId",async(req,res)=>{
    const data = await product.findOne({productId:req.params.productId});
    res.send(data);
});
router.get("/prodCat",async(req,res)=>{
    const data = await product.findOne({ategory:req.params.category});
    res.send(data);
});

//to update the db
router.put("/",async(req,res)=>{
    let data = await dbConnect();
    let response = await data.updateOne({
        productId:req.body.productId,
        $set : req.body,
    })
    res.json(response);
    let newData = await data.find({productId:req.params.productId}).toArray();
    res.send(newData);
});
//to delete a prod from the db
router.delete("/",async(req,res)=>{
    const data = await product.deleteOne({ productId:req.params.productId});
    res.send(data);
});

router.use((req,res,next)=>{
    res.json({error:'Not Found'});
});

app.use(router);
app.listen(3001);
console.log("Server running on port 3001");

module.exports = router;


