const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {validationResult} = require('express-validator');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        -api_user: 'ebinan10@gmail.com' ,
        api_key:'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'
    }
}))
exports.getLoginIn = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
   let message = req.flash('error')
   if(message.length > 0){
  message =  message[0]
   }
   else{
       message = null;
   }
    res.render('auth/login', {
    path:'/login',
    docTitle:'Login',
    existingUser: req.session.isLogIn,
    errorMessage: message,
    email : '',
    password :''
});     
}

exports.postLoginIn= ( req, res, next)=>{
    const email = req.body.email;
   const password =req.body.password;
   const errors = validationResult(req)

   if(!errors.isEmpty()){
       console.log(errors)
       return res.status(422).render('auth/login',
       {
           path:'/login',
           docTitle:'Login',
           errorMessage: errors.array()[0].msg,
           email : email,
           password : password,
           confirmPassword : req.body.confirmPassword
           
       }) 
   }   
 
    User.findOne({email : email}).then(user=>{
        
        if(!user){
          
         return res.status(422).render('auth/login',
       {
           path:'/login',
           docTitle:'Login',
           errorMessage: ' Wrong Email or Password ',
           email : email,
           password : password,
           confirmPassword : req.body.confirmPassword
           
       }) 
        }
        bcrypt.compare(password, user.password)
        .then(match =>{
           if(match){
            req.session.isLogIn = true;
            req.session.user = user;
            req.session.save((err)=>{ 
                  
        })
        res.redirect('/')
        }  
        return res.status(422).render('auth/login',
       {
           path:'/login',
           docTitle:'Login',
           errorMessage: ' Wrong Email or Password ',
           email : email,
           password : password,
           confirmPassword : req.body.confirmPassword
           
       })
             
        }).catch(err=>{ 
            console.log(err)
            return res.status(422).render('auth/login',
            {
                path:'/login',
                docTitle:'Login',
                errorMessage: ' Wrong Email or Password ',
                email : email,
                password : password,
                confirmPassword : req.body.confirmPassword
                
            }) 
    })
        })
    .catch(err => console.log(err));
    
}
exports.getSignUp= ( req, res, next)=>{
    let message = req.flash('error');
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword
    if(message){
        message = message[0]
    }
    else{
        message = null
    }

    res.render('auth/signup', {
        path:'/signup',
        docTitle:'Sign Up',
        existingUser:false,
        errorMessage: message,
        email:'',
        password:'',
        confirmPassword:'',
        validationError:[]
    });  
    
}
exports.postLogOut = (req ,res ,next ) =>{
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/')
    });
    
} 

exports.postSignUp = (req ,res ,next ) =>{
   const email = req.body.email;
   const password = req.body.password;
   const errors = validationResult(req);
    
   if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('auth/signup',{
                path : '/signup',
                docTitle : 'Sign Up',
                existingUser : false,
                errorMessage : errors.array()[0].msg,
                email : email,
                confirmPassword : req.body.confirmPassword,
                password : password,
                validationError : errors.array()
                
        })
        
    }
  
        bcrypt.hash(password, 12)
       .then(hashedPassword =>{
       const users = new User({
        email: email,
        password: hashedPassword,
        cart: {
            items:[]
        }
            })
    return users.save();

    }).then(result =>{
        res.redirect('/login')
      return transporter.sendMail({
            to:email,
            from:'ebinan10@outlook.com',
            subject: 'Signup succeeded!',
            html: '<h1>You Successfully signed up!</h1>'
        });
    }).catch(err=>console.log(err))
       
   
     .then(result=>{
        
    })
    .catch( err => console.log(err))
}