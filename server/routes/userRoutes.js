
const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/register',(req,res)=>{
    const {email, password} = req.body
    const sql = "SELECT * FROM hash WHERE email = ?"
    db.query(sql,[email],async(err,result)=>{
       if(result.length > 0){
        return(res.send({success: false, message: "Username Exists"}))
       }
    const hashed = await bcrypt.hash(password,10)
    const sqll = "INSERT INTO hash (email, password) values (?, ?)"
       db.query(sqll,[email,hashed],(err,result)=>{
          return(err ? res.send({success: false}): res.send({success: true}))
       })
    })
})


router.post('/login',  (req,res)=>{
    const{email,password, role} = req.body
    const sql = "SELECT * FROM hash WHERE email = ?"
    db.query(sql,[email], async (err,result)=>{
    if(result.length == 0){
       return res.send({success: false, message: "User Not Found"})
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