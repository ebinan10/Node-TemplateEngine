const express = require('express');

const middleware = require('../middleware/is-auth')

const path = require('path');

const shopController = require('../controller/shop') 

const router = express.Router();

router.get('/', shopController.getProduct); 

router.get('/products/:productId', shopController.getDetails);

router.post('/cart', middleware, shopController.postCart)

router.post('/create-order', middleware , shopController.postOrders)

router.get('/shop',  shopController.getIndex ); 

router.get('/cart', middleware, shopController.getCart);

router.get('/order', middleware, shopController.getOrder);

// router.get('/checkout', shopController.getCheckout)

router.post('/delete-cart', middleware, shopController.deletecartProduct); 

// router.post('/increase-cart',shopController.IncreaseCart );

// router.post('/decrease-cart',shopController.decreaseCart );

 
 module.exports = router 

