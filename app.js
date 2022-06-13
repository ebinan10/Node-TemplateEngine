const express = require('express');

const path = require('path')
const pathName = require('./util/path')

const shop = require('./Route/shop')
const admin = require('./Route/admin')
const User = require('./model/user')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const auth = require('./Route/auth')
const authCon = require('./controller/auth')
  
const error = require('./controller/error');

const cors = require('cors');

const app = express(); 

const flash = require('connect-flash')

const mongoConnect = require('./util/database').mongoConnect;

const mongoose = require('mongoose')
const { Db } = require('mongodb');
const url = 'mongodb://localhost:27017/ecommerce';
const store = new MongoDBStore({
  uri : url,
  collection: 'sessions'
})
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
  const csrfProtection = csrf();

app.set('view engine', 'ejs')
app.set('views','views')

app.use( express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));


  app.use( 
    session({
      secret: 'my secret', 
      resave: false, 
      saveUninitialized: false, 
      store:store
    }) );
    
    app.use(flash());

    app.use(csrfProtection);
     app.use( (req,res, next) => {
       if(!req.session.user){
        return next();
       }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next(); 
    }) 
    .catch(err => console.log(err));
  })
  app.use((req ,res , next)=>{
    res.locals.authenticated = req.session.isLogIn;
    res.locals.csrfToken = req.csrfToken(); 
    next()
  })
  app.use(admin)
  app.use( shop ); 
  app.use( auth );
  app.use( error.error)  
  
    
  mongoose.connect( url )
  .then(result => {   
    app.listen(3000);
  })
  .catch(err =>{
    console.log(err)
  }) 