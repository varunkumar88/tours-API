var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hellloworld' });
});


router.get('/api', function(req, res, next) {
  res.json({ message: 'this is api' });
});
module.exports = router;
