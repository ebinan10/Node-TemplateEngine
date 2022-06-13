const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : { 
    type: String,
    require: true
    },
    price : {
       type: String,
       required: true 
    },
    description :{
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')


// const ObjectId = mongodb.ObjectId

// class Product {
//   constructor(title, price,description,imageUrl, id, userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl =imageUrl;
//     this._id = id ? new ObjectId(id) : null; 
//     this.userId = userId;
//   }

//   save(){
//     const db = getDb()
//     let dbop
//     if(this._id){
//       // Update the product
//       dbop = db.collection('products')
//       .updateOne(  {_id: new mongodb.ObjectId(this._id)}, {$set: this})
  
//     }
//     else { 
//           dbop = db.collection('products').
//       insertOne(this);
//        }
//       return  dbop
//       .then(result =>{
//          console.log(result)
//         console.log('this is result')
//       })
//       .catch(err=>{
//         console.log(err)
//       })
//   }

//   static fetchAll(){
//     const db =getDb();
//     return db
//     .collection('products')  
//     .find()
//     .toArray()
//     .then(products =>{
//       console.log(products);    
//       return products
//     })
//     .catch(err=>console.log(err))
//   }
//     static findById(prodId){
//       const db = getDb();
//      return db
//       .collection('products')
//       .find({_id: ObjectId(prodId)})
//       .next()
//       .then(product =>{
//         // console.log(product)
//         return product;
//       })
//       .catch(err => console.log(err))
//     }

//     static delete(prodId){
//       const db = getDb()
//      return db.collection('products')
//       .deleteOne({_id:new ObjectId(prodId)})
//        .then(result=>{
//          console.log('deleted')
//        })
     
//       .catch(err => console.log(err))
    
//     }
// }



// module.exports = Product; 