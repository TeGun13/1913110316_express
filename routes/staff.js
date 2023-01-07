var express = require('express');
var router = express.Router();
const StaffController = require('../controllers/staffController')

/* GET home page. */
router.get('/',StaffController.staff);
router.get('/:id',StaffController.show);
router.post('/',StaffController.insert);
router.delete('/:id',StaffController.destroy);
router.put('/:id',StaffController.update);

module.exports = router;