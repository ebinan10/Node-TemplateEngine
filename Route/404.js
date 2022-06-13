const express = require('express');

const path = require('path');

const errorController = require('../controller/error') 

const router = express.Router();

router.get('/', errorController); 

 module.exports = router
