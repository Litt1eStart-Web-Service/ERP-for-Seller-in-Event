const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({error: 'Unauthorized'})

    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    if(!token)
        return res.status(401).json({error: 'Token is invalid'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) next(err)

        req.user = decoded
        next()
    })
}

module.exports = verifyToken