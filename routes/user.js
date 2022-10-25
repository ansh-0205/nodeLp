const express = require('express');
const app = express();
const router = express.Router();
const url = "mongodb+srv://Ansh:prasham__2006@cluster0.hv3pq8h.mongodb.net/test";
//MongoClient allows making connections with mongodb
const {MongoClient} = require('mongodb');
const { update } = require('../models/product');
const c = new MongoClient(url);


async function dbConnect(){
    let res = await c.connect();
    let db = res.db('test');
    return db.collection('user');
}

const user = require('../models/user');

app.use(express.json());

//to add a new user to the db
router.post("/newuser",async(req,res)=>{
    const {roles , name , email , password } = req.body;
    //to make sure none of the inputs are empty
    if(!roles || !name || !email || !password )
    return res.json({error: 'Please fill in all the required details'});
    const User = new user({roles , name , email , password  })
    User.save().then(()=>res.json({message:'Successful'})
    ).catch((err)=>res.json({error: 'Error'}));
});

//to get users  (to get all users , users with specific name , users with specific roles)
router.get("/users",async(req,res)=>{
    const data = await user.find();
    res.send(data);
});
router.get("/userName",async(req,res)=>{
    const data = await user.findOne({Name:req.params.Name});
    res.send(data);
});
router.get("/userRoles",async(req,res)=>{
    const data = await user.findOne({roles:req.params.roles});
    res.send(data);
});

//to update the db
router.put("/",async(req,res)=>{
    // let data = await dbConnect();
    // let response = await data.updateOne({
    //     roles:req.body.roles},
    //     {$set : req.body,
    // })
    // res.send(response);
    // let newData = await data.find({roles:req.params.roles}).toArray();
    // res.send(newData);
    const data = await user.updateOne({roles:req.body.roles},{$set : req.body});
    res.send(data);
});
//to delete a user from the db
router.delete("/",async(req,res)=>{
    const data = await user.deleteOne({name:req.params.name});
    res.send(data);
});

router.use((req,res,next)=>{
    res.json({error:'Not Found'});
});

app.use(router);
app.listen(3000);
console.log("Server running on port 3000");

module.exports=router;


