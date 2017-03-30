var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
	res.render('index');
});

router.post('/', function(req, res){
	console.log(req.body);
	res.locals.text = req.body.nerdy;
	res.locals.color = req.body.color;
	res.render('post');
})

module.exports = router;
