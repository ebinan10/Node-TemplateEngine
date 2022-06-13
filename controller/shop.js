const Product = require('../model/product')
const User = require('../model/user')
 const Order = require('../model/order') 
 
exports.getProduct = (req, res, next)=>{
        if(req.session.isLogIn){
            req.session.user
        }    
        Product.find()
        .then((products)=>{ 
            res.render('shop/product-list',{
                docTitle:"All product",
                prods:products,
                path:'/',
                prodBool : products.length >  0,
                title : products.title,
                imageUrl : products.imageUrl,
                description : products.description,
                price : products.price,
                id : products._id,
                email :req.session.isLogIn ? req.session.user.email:''
        })})
        .catch(err=>{
            console.log(err)
        }) ;
       
}
  

exports.getIndex = (req, res, next)=>{
    Product.find()
    .then((products)=>{
        res.render('shop/index',{
            docTitle:"Shop",
            prods:products,
            path:'/shop',
            title:products.title,
            imageUrl:products.imageUrl,
            description:products.description,
            price : products.price,
            id: products._id,
            email :req.session.isLogIn ? req.session.user.email:''
         })
    })
    .catch(err =>{
        console.log(err)
    })    
}


exports.getCart = (req, res, next) => {   
    req.user
    .populate('cart.items.productId')
    .then(products =>
            {
                const prod =products.cart.items
                res.render('shop/cart',{
                        path:'/cart',
                        docTitle:'Your Cart',
                        prod:prod,
                        email :req.session.isLogIn ? req.session.user.email:''
                    })
    })
    .catch(err=>
        console.log(err)
    ) 
}


exports.postCart = (req, res, next) => { 
    
    const prodId = req.body.productId;
    console.log(prodId)
    Product.findById(prodId)
    .then(product =>{
        return req.user.addToCart(product);
     })
    .then(result =>{
        console.log(result);
        res.redirect('/cart')
    })
    .catch(err=>{
        console.log(err)
    })  
} 

 
exports.getDetails = (req, res, next) => {
   const prodId= req.params.productId;
        
  Product.findById(prodId)
    .then(products=>{
        console.log(products)
        res.render('shop/product-detail',{
            path:'/',
            docTitle:'Product Information', 
            product:products,
            email :req.session.isLogIn ? req.session.user.email:''
          })
    
       })
        .catch( err=>
        console.log(err)
    )
   }  

exports.getOrder = (req, res, next) => {
    Order.find({'user.userId':req.user._id})
    .then(order =>
            {
             console.log(order)
                res.render('shop/orders',{
                path:'/orders',
                docTitle:'Your Orders',
                orders:order,
                email :req.session.isLogIn ? req.session.user.email:''
                })
                })   
            }

exports.postOrders = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then(products =>
            {
                const prod = products.cart.items.map(item =>{
                    return { product: {...item.productId._doc}, quantity: item.quantity}
                })
          
    const order = new Order({
            user:{
                email: req.user.email,
                userId: req.user
            },
            products:prod
        })
         order.save()
    }).then(()=>{
            req.user.clearUser()    
        })
        .then(result=>{
            res.redirect('/order')
        })
        .catch(err=> console.log(err)) 

}
//     ).catch(err=>console.log(err))

// //     let fetchedCart
// //     req.user.getCart()
// //     .then(cart =>{
// //         fetchedCart = cart;
// //         return cart.getProducts()
// //     })
// //     .then(products=>{
// //         return req.user
// //         .createOrder()
// //         .then(order =>{
// //            return order.addProducts(products.map(
// //                product =>{
// //                 product.orderItem = {quantity:product.cartItem.quantity};
// //                 return product
// //             }))
// //         })
// //     })
// // .then( result => {
// //           return fetchedCart.setProducts(null)
// //         })
// //     .then(result =>{
// //         res.redirect('/orders')
// //     })
// //     .catch(err=>{
// //         console.log(err)
// //     })
// }

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/check-out',{
//         path:'/checkout',
//         docTitle:'Checkout'
//     })

   
// }
exports.deletecartProduct = ( req, res, next) =>{
   let productId = req.body.productId
   console.log(productId)
        req.user.deleteCart(productId)
        .then(result=>{
            console.log(result)
            res.redirect('/cart')
        })
        .catch(err=>console.log(err))
    
} 
     

// exports.IncreaseCart =(req,res,next) =>{
//     const prodid = req.body.productId
//     const qty = req.body.productQty
//     const price = req.body.productPrice
//     Cart.increaseCart(prodid, qty, price)
//     res.redirect('/cart')
    
// }

// exports.decreaseCart = (req,res,next) =>{
//     const prodid = req.body.productId
//     const qty = req.body.productQty
//     const price = req.body.productPrice 
//     Cart.decreaseCart(prodid, qty, price)
//     res.redirect('/cart')
   
// } 