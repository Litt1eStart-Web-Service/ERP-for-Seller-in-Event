const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async() => {
    mongoose.connect(process.env.DEV_MONGO_URI)
    .then(()=>console.log('Connected to Database'))
    .catch((err)=>console.log(err.message))
}

module.exports = connectDb