var express = require('express');
var router = express.Router();
const { Shop,menu,show} = require("../controllers/shopController");

/* GET home page. */
router.get('/',Shop);
router.get('/menu',menu);
router.get('/:id',show);



module.exports = router;