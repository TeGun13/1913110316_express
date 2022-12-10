var express = require('express');
var router = express.Router();
const StaffController = require('../controllers/staffController')

/* GET home page. */
router.get('/',StaffController.staff);
router.post('/',StaffController.insert);

module.exports = router;