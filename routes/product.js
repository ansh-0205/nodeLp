const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const authentication = require('../middleware/auth');
const{ upload,  addImage} = require('../Fileupload/prodImage');
const {
    newProd,
    prod,
    prodName,
    prodId,
    prodCat,
    updateProd,
    deleteProd,
    dashboard
} = require('../controllers/product');


router.post('/prodImage/:id' ,authentication.auth ,upload.array('image') , addImage);
router.post('/newProd',authentication.auth, newProd);
router.get('/dashboard' ,authentication.auth, dashboard)
router.get('/prod',authentication.auth, prod);
router.get('/prodName', authentication.auth , prodName);
router.get('/prodId',authentication.auth , prodId);
router.get('/prodCat',authentication.auth , prodCat);
router.patch('/:id',authentication.auth , updateProd);
router.delete('/:id',authentication.auth, deleteProd);


module.exports=router;