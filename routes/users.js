var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Hello baboi');
  res.status(200).json({
    Fullname:'Kunyanut Techaphalangrak'
  })

});

router.get('/bio', function(req, res, next) {
  // res.send('Hello baboi');
  res.status(200).json({
    Fullname:'Kunyanut Techaphalangrak',
    Nickname:"Gun",
    Hobby:"Drawning",
    GithubUsername:"TeGun13"
  })

});

module.exports = router;
