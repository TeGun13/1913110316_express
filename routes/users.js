var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT')

/* GET users listing. */

router.get('/', userController.index);
router.get('/', userController.bio);
router.post('/', [
    body('name').not().isEmpty().withMessage('กรุณาใส่ชื่อ นามสกุล'),
    body('email').not().isEmpty().withMessage('กรุณาใส่อีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณาใส่รหัสผ่านด้วย').isLength({ min: 5 }).withMessage('รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป')
], userController.register);

router.post('/login', [
    body('email').not().isEmpty().withMessage('กรุณาใส่อีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณาใส่รหัสผ่านด้วย').isLength({ min: 5 }).withMessage('รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป')
], userController.login);

router.get('/', [passportJWT.isLogin], userController.profile)

module.exports = router;
