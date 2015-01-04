var express = require('express');
var router = express.Router();
var user = require('../data/user');
var friends = require('../data/friends');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:vin', user.fetch);
router.get('/user/:vin/update', user.update);
router.get('/friends/:vin', friends.fetch);


module.exports = router;

