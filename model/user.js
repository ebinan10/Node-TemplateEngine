 const mongoose = require('mongoose')
const Product = require('../model/product')
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
     email:{
         type: String,                           
         required: true
     },
      password: {
         type: String,
         require : true
     },
     cart:{
         items:[
             {productId: { type: Schema.Types.ObjectId, ref: 'Product' , required: true } ,
             quantity: { type: Number, required:true}
            }]
     }
 })

    userSchema.methods.addToCart = function(product){
        const cartProduct = this.cart.items.findIndex(cp =>{
            return cp.productId.toString() === product._id.toString();
        })
            let newQuantity = 1 ;
        
            const updatedCartItem = [...this.cart.items];
        
            if(cartProduct >= 0){
                newQuantity =  this.cart.items[cartProduct].quantity + 1;
                updatedCartItem[cartProduct].quantity = newQuantity;
            }
            else{
                updatedCartItem.push({productId: product._id , quantity: newQuantity}) ;
            }
           const updatedCart = {
                items : updatedCartItem
            }
            this.cart = updatedCart
        return this.save()
    }

    userSchema.methods.deleteCart = function(productId){
        const cart = this.cart.items

        const updatedCartItem = this.cart.items.filter(item =>{
                            return item.productId.toString() !== productId.toString();
                    })
                    this.cart.items = updatedCartItem
                   return this.save()
        // const productIds = this.cart.items.map(i =>{
        //             return i.productId
        //         }) 
            
        //          return User
        //          .find({_id:{$in: productIds}}).toArray()
        //          .then(products =>{
        //           return products.map(
        //              p=>{
        //             return{
        //                 ...p, quantity: this.cart.items.find(i =>{
        //                     return i.productId.toString() === p._id.toString();
        //                 }).quantity
        //             }
        //         } 
        //         )
        //         })
    }
    userSchema.methods.clearUser = function(){
        this.cart ={item:[]}
        return this.save()
    }

 module.exports = mongoose.model('User', userSchema)

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')
// const ObjectId = mongodb.ObjectId

// class User{
//     constructor(username, email, cart, order, id){
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this.order = order;
//         this._id = id;
//     }

//     save(){
//         const db = getDb();
//      return db.collection('users')
//        .insertOne(this)
//         .then(user=>{
//             // console.log(user
//         })
//     }

    
//         // postOrder(){
//         //     const updatedCart = this.cart.items
//         //     const db = getDb();
//         // return db.collection('users').insertOne(
//         //         {order :{items:updatedCart}}
//         //     )
//         // }

//     addToCart(product){
//         const cartProduct = this.cart.items.findIndex(cp =>{
//             return cp.productId.toString() === product._id.toString();
//         })
//             let newQuantity = 1 ;
           
//             const updatedCartItem = [...this.cart.items];
           
//             if(cartProduct >= 0){
//                 newQuantity =  this.cart.items[cartProduct].quantity + 1;
//                 updatedCartItem[cartProduct].quantity = newQuantity;
//             }
//             else{
//                 updatedCartItem.push({productId: new ObjectId(product._id) , quantity: newQuantity}) ;
//             }
//            const updatedCart = {
//                 items : updatedCartItem
//             }
//          const db = getDb();
//         return db.collection("users").updateOne({_id: new ObjectId(this._id)},
//         {$set: {cart: updatedCart}} 
//         );
//     }

//     addOrder(){
//         let order;
//         let db;
//         return this.getCart()
//         .then(products =>{
//              order = {
//             user:{ id : new ObjectId(this._id)},
//             items: products,
             
//                      } 
//             db = getDb()
//         return db.collection("order")
//         .insertOne(order)
//         })
//         .then(orders=>{
//                 console.log(orders)
//                 this.cart = {items:[]};
//                const db = getDb();
//         return db.collection("users")
//         .updateOne({_id: new ObjectId(this._id)},
//         {$set: {cart: {items:[]}}} 
//         );
//         })
//         .catch(err => console.log(err))
//     }


//        static findById(userId){
//         const db = getDb();
//        return db.collection('users')
//         .findOne({_id:new ObjectId("616e5beceaeae7d47ee3dc9e")})
//        .then(user =>{
//             console.log("findById") 
//             return user
//        })
//        .catch(err => console.log(err))
       
       
//     }


//     static fetchAll(){
//         const db = getDb();
//         return db.collection('users ').find().toArray()
//         .then(users=>{
//             console.log(users)
//             return users
//         })
//     }


//     getCart(){
//      const db = getDb();
//     //  console.log(this.cart.items)
//     const productIds = this.cart.items.map(i =>{
//         return i.productId
//     }) 

//      return db.collection('products')
//      .find({_id:{$in: productIds}}).toArray()
//      .then(products =>{
//       return products.map(
//          p=>{
//         return{
//             ...p, quantity: this.cart.items.find(i =>{
//                 return i.productId.toString() === p._id.toString();
//             }).quantity}
//     }
//     )
//     })
//     }

//     deleteCart(productId){
//           const updatedCartItem = this.cart.items.filter(item =>{
//                 return item.productId.toString() !== productId.toString();
//         });
//         const db = getDb();
//         return db
//         .collection('users')
//         .updateOne({_id: new ObjectId(this._id)},
//         { $set: { cart: { items: updatedCartItem}}} 
//         )
//         .then(result=>{
//             console.log(result)
//         })
//         ;
//     }
//         // postOrder(){
//         //     const db = getDb()
//         //     const updateCartItem = this.cart.items;
//         //     let updatedOrderItem = db.collection("users").findOne({_id:new ObjectId("617572babc232506f7e385b8")})
//         //     .then(user =>{
//         //          console.log("this is",user.order.items) 
//         //          return user.order.items
//         //     })
//         //     console.log(updatedOrderItem)
            
               
//         //         if(updatedOrderItem._id == updateCartItem._id){
//         //             const orderIndex = updatedOrderItem.findIndex(order =>{
//         //                 order.productId.toString() === updateCartItem.productId.toString()
//         //             })
//         //             const cartIndex = updateCartItem.findIndex(cart=>{
//         //                 cart.productId.toString() === updatedOrderItem.productId.toString()
//         //             })                       
//         //             updatedOrderItem[orderIndex].quantity = this.order.items[orderIndex].quantity
//         //             + this.cart.items[cartIndex].quantity;
//         //         }
//         //         else{
//         //             const orderItem = updateCartItem.filter(cart=>{
//         //                 cart._id.toString() !== updatedOrderItem._id.toString()
//         //             })
//         //             updatedOrderItem.push({orderItem})
//         //         }
                
//         //         const updatedOrder = {
//         //             items : updatedOrderItem
//         //         }
//         //         this.cart.items=[];
//         //       db = getDb();
//         //       db.collection("users").updateOne({_id: new ObjectId(this._id)},
//         // {$set: {cart: null}} 
//         // );
//         //     return db.collection("users").updateOne({_id: new ObjectId("61756b3318eb5fd56105d5d2")},
//         //     {$set: {order :{item: updatedOrder}}} 
//         //     );
//         // }

//         getOrder(){
//             const db = getDb();
//             // .findOne({_id:new ObjectId("616e5beceaeae7d47ee3dc9e")})
//            return db.collection("order").find({'user.id':new Object(this._id)}).toArray()
//            .then(order=>{
//                     // console.log(order)
//                     return order
                    
//            }
//            )
//         }
//     }
 
// module.exports = User;