const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 12
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 12
    }
}, { timestamps: true})

const User = mongoose.model('User', schema)

module.exports = User