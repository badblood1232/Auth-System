const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))

app.use(cookieParser())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'authentication'
})



app.post('/register',(req,res)=>{
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


app.post('/login',  (req,res)=>{
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

app.get('/logout',(req,res)=>{
   res.clearCookie('token')
   return(res.send({Status: "Success"}))
})


app.post('/create_employee',(req,res)=>{
   const {name, age, gender} = req.body
   const sql = "INSERT INTO employee (name, age, gender) VALUES  (?, ?, ?)"
   db.query(sql,[name,age,gender],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "Success"}))
   })

})
app.get('/get_employee',(req,res)=>{
   const sql = "SELECT * FROM employee "
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

app.get(`/view_employee/:id`,(req,res)=>{
   const id = req.params.id
   const sql = "SELECT * FROM employee WHERE id = ?"
   db.query(sql,[id],(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

app.put(`/edit_employee/:id`,(req,res)=>{
   const id = req.params.id
   const {name, age, gender} = req.body
   const sql = "UPDATE employee SET name = ?, age = ?, gender = ? where id = ?"
   db.query(sql,[name, age, gender,id],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "success"}))
   })
})


app.delete(`/delete_employee/:id`,(req,res)=>{
   const id = req.params.id
   const sql = "DELETE FROM employee WHERE id = ?"
   db.query(sql,[id],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "Deleted"}))
   })
})

app.get('/get_division',(req,res)=>{
   const sql = 'SELECT * FROM division '
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})
app.get('/get_class',(req,res)=>{
   const sql = 'SELECT * FROM class'
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

app.listen(3001,()=>{
    console.log("listening")
})
