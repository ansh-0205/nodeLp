const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const {addToCart, viewCart ,deleteitem} = require('../controllers/cart');
const authentication = require('../middleware/auth');


router.get('/showcart', authentication.auth ,viewCart );
router.post('/addtocart/:quantity/:id', async(req,res,next)=>{console.log(req.params.id); next();} ,authentication.auth ,addToCart );
router.get('/deleteitem/:prodID', authentication.auth , deleteitem);

module.exports = router; 