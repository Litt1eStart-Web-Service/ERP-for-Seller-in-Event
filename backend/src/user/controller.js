const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('./model')

const signup = async(req, res) => {
    const { username, password, confirmPassword } = req.body
    
    if(!username || !password || !confirmPassword)
        return res.status(400).json({error: 'User Credential is not complete'})

    if(password !== confirmPassword)
        return res.status(400).json({error: 'Password not match'})

    try {
        const salt = await bcryptjs.genSalt(5)
        const hashedPassword = await bcryptjs.hash(password, salt)         
        const user = await User.create({username, password: hashedPassword})
        if(!user)
            throw new Error('Failed to create new User')

        const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const login = async(req, res) => {
    const { username, password } = req.body
    if(!username || !password)
        return res.status(400).json({error: 'User Credential is not complete'})

    try {
        const user = await User.findOne({ username })
        if(!user)
            throw new Error('This account doesnt Exist in our System')
        
        const match = await bcryptjs.compare(password, user.password)
        if(!match)
            throw new Error('Password not correct')   

        const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY)
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { signup, login }