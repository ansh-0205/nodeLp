const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());

router.get('/showcart',  );
router.post('/addtocart',  );
router.get('/deleteitem/:item',  );

module.exports = router;