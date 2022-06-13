const express = require('express')

const path = require('path')

const adminController = require('../controller/admin');
const middleware = require('../middleware/is-auth')
const router = express.Router();

router.get('/admin/add-product', middleware, adminController.getAddProduct ); 

router.get('/admin/edit-product/:productId', middleware , adminController.getEditProduct ); 

router.post('/admin/add-product', middleware , adminController.postAddProduct ); 

router.post('/admin/edit-product', middleware, adminController.postEditProduct );  

router.post('/admin/delete-product',middleware, adminController.deleteProduct ); 

router.get('/admin/products', middleware ,adminController.getProduct);

module.exports = router; 
 