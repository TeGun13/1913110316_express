var express = require('express');
var router = express.Router();
const StaffController = require('../controllers/staffController')
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')

/* GET home page. */
router.get('/',[passportJWT.isLogin],StaffController.index)
router.get('/',StaffController.staff);
router.get('/:id',StaffController.show);
router.post('/',
[
    body("name").not().isEmpty().withMessage("Name cannot be empty."),
    body("salary").not().isEmpty().withMessage("Salary cannot be empty.").isNumeric().withMessage("Salary must be a number")
]

,StaffController.insert);
router.delete('/:id',StaffController.destroy);
router.put('/:id',StaffController.update);

module.exports = router;