const User = require('../model/user')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
 
const OrderSchema = new Schema({
    products:[{
            product: { type: Object, required: true } ,
            quantity: { type: Number, required:true},
           } ],
        user:{
            email : {
                type:String,
                required : true
            },
            userId :{
            type : Schema.Types.ObjectId,
            required:true,
            ref:'User'
            }
        }
    }
 )

    OrderSchema.methods.addOrder = function(){
        const updatedOrder = this.cart.items
        this.order = { items : updatedOrder}
        this.cart.items = [];
        this.save()
    }

module.exports =  mongoose.model('Order', OrderSchema)
// const sequelize = require('../util/database')

// const Sequelize = require('sequelize')

// const Order = sequelize.define('order',
//     {
//         id:{
//             type : Sequelize.INTEGER,
//             autoIncrement : true,
//             allowNull:false,
//             primaryKey: true
//         }
//     }
// )
// module.exports = Order;