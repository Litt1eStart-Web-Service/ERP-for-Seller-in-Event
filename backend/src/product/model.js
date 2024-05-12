const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
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
    },
    estValue: {
        type: Number,
        default: function () {
            return this.price * this.amount
        }
    },
    totalMargin: {
        type: Number,
        default: function () {
            return this.margin * this.amount
        }
    },
    estProfit: {
        type: Number,
        default: function () {
            return this.estValue - this.totalMargin
        }
    }
})

schema.pre('save', function(next){
    this.estValue = this.price * this.amount
    this.totalMargin = this.margin * this.amount;
    this.estProfit = this.estValue - this.totalMargin;
    next();
})

const Product = mongoose.model('Product', schema)

module.exports = Product