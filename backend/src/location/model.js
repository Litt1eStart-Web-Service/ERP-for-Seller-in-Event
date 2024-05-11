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
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

const Location = mongoose.model('Location', schema)

module.exports = Location