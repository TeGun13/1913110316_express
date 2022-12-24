var express = require('express');
var router = express.Router();
const ShopController = require('../controllers/shopController')

/* GET home page. */
router.get('/',ShopController.Shop);
router.get('/menu',ShopController.menu);



module.exports = router;