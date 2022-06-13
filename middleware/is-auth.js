module.exports = (req, res, next) =>{
    console.log(req.session.isLogIn)
     if(!req.session.isLogIn){
        return res.redirect('/login')
     }
     next();
}  