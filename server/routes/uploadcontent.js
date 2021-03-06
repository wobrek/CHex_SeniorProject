var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var hostname = "localhost:9000";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/Download')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post('/', function(req, res) {
  var upload = multer({
		storage: storage
	}).single('file')
	upload(req, res, function(err) {
		res.end('File is uploaded')
	})
});

module.exports = router;
