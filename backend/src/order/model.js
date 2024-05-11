const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    planner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planner',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true  
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    }
})

const Order = mongoose.model('Order', schema)

module.exports = Order