const express = require('express');
const app = express();
const router = express.Router();
const url = "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test";
//MongoClient allows making connections with mongodb
const {MongoClient} = require('mongodb');
const c = new MongoClient(url);

require('../dbConnect');
const user = require('../models/user');

app.use(express.json());
async function dbConnect()
{
    let response = await c.connect();
    let db = response.db('TestDB');
    return db.collection('user');
}

//to add products to the db
router.post("/newUser",(req,res)=>{
    const {roles , name , email , password } = req.body;
    //to make sure none of the inputs are empty
    if(!roles || !name || !email || !password )
    return res.json({error: 'Please fill in all the required details'});
    const User = new user({roles , name , email , password  })
    User.save().then(()=>res.json({message:'Successful'})
    ).catch((err)=>res.json({error: 'Error'}));
});

//to get products  (to get all users , users with specific name , users with specific roles)
router.get("/users",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
});
router.get("/userName",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find({Name:req.params.Name}).toArray();
    res.send(data);
});
router.get("/userRoles",async(req,res)=>{
    let data = await dbConnect();
    data = await data.find({roles:req.params.roles}).toArray();
    res.send(data);
});

//to update the db
router.put("/",async(req,res)=>{
    let data = await dbConnect();
    let response = await data.updateOne({
        roles:req.body.roles},
        {$set : req.body,
    })
    res.send(response);
    let newData = await data.find({roles:req.params.roles}).toArray();
    res.send(newData);
});
//to delete a prod from the db
router.delete("/",async(req,res)=>{
    let data = await dbConnect();
    let response = await data.deleteOne({
        name:req.body.name
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


