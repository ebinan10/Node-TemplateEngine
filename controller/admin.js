const Product = require('../model/product')


exports.getAddProduct = (req, res, next)=>{
       res.render('admin/edit-product',{
        docTitle:"Add Product",
        path:'/admin/add-product',
        editing:false,
        email :req.session.isLogIn ? req.session.user.email:''
      }) 
     
}

exports.postAddProduct = ( req, res, next)=>{    
const title = req.body.title;
const imageUrl = req.body.imageUrl;
const price = req.body.price;
const description = req.body.description;
const product = new Product({
    title: title, 
    price: price, 
    description: description, 
    imageUrl: imageUrl, 
    userId: req.user._id,
    email :req.session.isLogIn ? req.session.user.email:'' 
        });
product.save()
.then(result =>{
    console.log(product)
    res.redirect('/')
})
.catch(err =>console.log(err))

};

exports.postEditProduct = ( req, res, next)=>{   
    const id = req.body.productId 
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
        
    Product.findById(id).then(product =>{
        // console.log(product.userId, req.user._id)
        if(product.userId.toString() !==  req.user._id.toString()){
           return res.redirect('/')
        }
        product.title=updatedTitle,
        product.price= updatedPrice,
        product.description=updatedDescription,
        product.imageUrl= updatedimageUrl 
       return product.save().then(result =>
        {
        console.log('updated product!!!')
        res.redirect('/admin/products')
    }) 
    }).catch(err => console.log(err))
    
    };

    exports.deleteProduct = ( req, res, next)=>{   
        const prodId = req.body.productId
        console.log(prodId)
        Product.deleteOne({_id:prodId, userId: req.user._id}) 
        .then(product=>{ 
           console.log('DESTROY PRODUCT')
           res.redirect('/admin/products')
         }
        )
        .catch(err=>{ 
        console.log(err) 
        })
        ;
        
        };

    exports.getEditProduct = (req, res, next)=>{
    const editMode = req.query.edit;
   
    if(!editMode){
      return res.redirect('/');
       
    }
    const prodId = req.params.productId
    //console.log(prodId)
    Product.findById(prodId)
    // Product.findById(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/')
        }
    res.render('admin/edit-product',{
    docTitle:"Edit Product",
    path:'/admin/products', 
    editing:editMode,
    product : product,
    email :req.session.isLogIn ? req.session.user.email:''
 }) 
    })
    .catch(err=>{   
        console.log(err)
    })
    
 
}

exports.getProduct = (req, res, next)=>{
    Product.find({userId : req.user._id})
    //
    .populate('userId')
    .then(products=>{
        res.render('admin/products',{
        docTitle:"Admin Products",
        prods:products,
        path:'/admin/products',
        email :req.session.isLogIn ? req.session.user.email:''
})}
)
    .catch(err=>{
        console.log(err)
    })
}