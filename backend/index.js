const express = require('express')

const userRoute = require('./src/user/route')
const productRoute = require('./src/product/route')
const plannerRoute = require('./src/planner/route')
const transactionRoute = require('./src/transaction/route')

const app = express()

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/planner', plannerRoute)
app.use('/api/v1/transaction', transactionRoute)

app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:${3000}`)
})