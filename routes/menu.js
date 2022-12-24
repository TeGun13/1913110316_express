var express = require('express');
var router = express.Router();
const ShopController = require('../controllers/shopController')

/* GET home page. */
router.get('/',ShopController.Shop);



module.exports = router;