const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const authentication = require('../middleware/auth');
const {directOrder , orderCart , showOrders } = require('../controllers/orderController');

router.post('/directOrder/:prodID/:Quantity' ,authentication.auth , directOrder );
router.post('/cartOrder' ,authentication.auth ,orderCart);
router.get('/myOrders' , authentication.auth ,showOrders );

module.exports =  router;