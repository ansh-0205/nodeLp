const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const {addToCart} = require('../controllers/cart');
const authentication = require('../middleware/auth');


//router.get('/showcart',  );
router.post('/addtocart/:id/quantity', async(req,res,next)=>{console.log(req.params.id); next();} ,authentication.auth ,addToCart );
//router.get('/deleteitem/:item',  );

module.exports = router;