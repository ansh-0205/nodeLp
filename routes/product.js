const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const {
    newProd,
    prod,
    prodName,
    prodId,
    prodCat,
    updateProd,
    deleteProd
} = require('../controllers/product');
router.post('/newProd',newProd);
router.get('/prod',prod);
router.get('/prodName',prodName);
router.get('/prodId',prodId);
router.get('/prodCat',prodCat);
router.patch('/:id',updateProd);
router.delete('/:productId',deleteProd);
app.use(router);
app.listen(3001);

module.exports=router;