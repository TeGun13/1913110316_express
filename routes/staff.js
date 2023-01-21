var express = require('express');
var router = express.Router();
const StaffController = require('../controllers/staffController')
const { body } = require('express-validator');

/* GET home page. */
router.get('/',StaffController.staff);
router.get('/:id',StaffController.show);
router.post('/'
 [
    body('name').not().isEmpty().withMessage('กรุณาใส่ชื่อ นามสกุล'),
    body('salary').not().isEmpty().withMessage('กรุณาใส่เงินเดือน').isCurrency().withMessage('กรุณาใส่ตัวเลข')
]

,StaffController.insert);
router.delete('/:id',StaffController.destroy);
router.put('/:id',StaffController.update);

module.exports = router;