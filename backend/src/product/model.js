const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    margin: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        min: 0
    }
})

const Product = mongoose.model('Product', schema)

module.exports = Product