exports.error = (req,res,next)=>{
    res.status(404).render('404',{
        docTitle:"Not Found",
         path:'',
         authenticated: req.login
        });
} 