var express = require('express');
var router = express.Router();
var sendEmail = require('../api/contact/contactForm');

router.post('/',sendEmail.post);

module.exports = router;