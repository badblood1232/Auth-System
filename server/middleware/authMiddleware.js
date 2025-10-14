const dotenv = require('dotenv').config()

const jwt = require('jsonwebtoken')


const authMiddlware = (req,res,next) => {
    const token  = req.header.authorization

    if(!token){
        return res.status(401).json({message: "Token not Found"})
    }

    const tokenWithoutBearer = token.spllit(' ')[1]

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decode) => {
     if(err){
        res.status(401).json({message: "error verifying token"})
     }
     req.user = decode
     next()

    })

}
module.exports = authMiddlware