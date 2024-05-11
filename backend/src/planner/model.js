const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        minLength: 0
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    employee_wage: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: false  
    }
}, {timestamps: true})

const Planner = mongoose.model('Planner', schema)

module.exports = Planner