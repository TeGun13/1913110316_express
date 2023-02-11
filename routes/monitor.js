var express = require('express');
var router = express.Router();
const MoRouter = require("../controllers/monitorController");
const { body } = require('express-validator');

/* GET home page. */
router.get('/', MoRouter.get);
router.delete('/:id',MoRouter.destroy);
router.post('/',
    [
        body("brand")
            .not().isEmpty()
            .withMessage("Name's brand cannot be empty."),
        body("modelName")
            .not()
            .isEmpty()
            .withMessage("cannot be empty."),
        body("price")
            .not()
            .isEmpty()
            .withMessage(" cannot be empty.")
            .isNumeric()
            .withMessage("must be a number"),
        body("amount")
            .not()
            .isEmpty()
            .withMessage(" cannot be empty.")
            .isNumeric()
            .withMessage(" must be a number")

    ]
    , MoRouter.insert);

    router.put('/:id',MoRouter.update);
module.exports = router;