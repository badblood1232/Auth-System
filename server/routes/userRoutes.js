
const express = require('express')
const router = express.Router()
const dbWithDatabase = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


router.post('/register',(req,res)=>{
    const {email, password} = req.body
    const sql = "SELECT * FROM users WHERE username = ?"
    dbWithDatabase.query(sql,[email],async(err,result)=>{
       if(result.length > 0){
        return(res.status(402).json({success: false, message: "Username Exists"}))
       }
    const hashed = await bcrypt.hash(password,10)
    const sqll = "INSERT INTO users (username, password) values (?, ?)"
       dbWithDatabase.query(sqll,[email,hashed],(err,result)=>{
          return(err ? res.send({success: false}): res.send({success: true}))
       })
    })
})


router.post('/login',  (req,res)=>{
    const{email,password, role} = req.body
    const sql = "SELECT * FROM users WHERE username = ?"
    dbWithDatabase.query(sql,[email], async (err,result)=>{
      if(err){
         return res.status(500).json({message: "Database Error"})
      }

    if(result.length === 0){
       return res.status(404).json({success: false, message: "User Not Found"})
    }   
    const user = result[0]
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch){
      const token = jwt.sign({email}, "jwt-secret-key", {expiresIn: '1d'})
      res.cookie("token",token)
      return(res.send({success: true,token,email, message: "Password Match"}))
    }
    return(res.send({success: false, message: "invalid password"}))
    })
})

router.get('/logout',(req,res)=>{
   res.clearCookie('token')
   return(res.send({Status: "Success"}))
})

module.exports = router