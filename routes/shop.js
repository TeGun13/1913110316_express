var express = require('express');
var router = express.Router();
const { Shop, menu, show, insert } = require("../controllers/shopController");
const { body } = require('express-validator');

/* GET home page. */
router.get('/', Shop);
router.get('/menu', menu);
router.get('/:id', show);

router.post('/'
[
    body("name").not().isEmpty().withMessage("Name cannot be empty."),
    body("location")
        .not()
        .isEmpty()
        .withMessage("Lat in Location cannot be empty.")
        .isNumeric()
        .withMessage("Lat in Location must be a number")
  ]
    , insert);

module.exports = router;