const express = require('express');
const { check, body } = require('express-validator')
const router = express.Router();
const User = require('../model/user')
const authController =  require('../controller/auth')

router.get('/login', authController.getLoginIn )

router.get('/signup',authController.getSignUp )

router.post('/login',authController.postLoginIn )

router.post('/logout', authController.postLogOut)

router.post('/signup', [
check('email').isEmail()
.withMessage('Please enter a valid email')
.custom( (value,{req})=>{
   return User.findOne({email:value})
    .then(user=>{
        if(user){
        return Promise.reject('Email exist already, please pick a different one')
        }
        return true;
} ) })
,
body('password',
'please enter a valid password with only numbers and text and at least 5 characters.'
)
.isLength({min:7})
.withMessage('please enter a longer password')
.isAlphanumeric()
.withMessage('please enter a password consisting of numbers and txt')
,
body('confirmPassword')
.custom((val, {req})=>{
    if( val !== req.body.password){
        throw new Error('Password does not match')
    }
    return true;
}).withMessage('password does not match')
], authController.postSignUp)

module.exports = router