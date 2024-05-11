const express = require('express')

const app = express()

app.use('/', (req, res) => {
    res.send('Welcome my brother!!')
})

app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:${3000}`)
})