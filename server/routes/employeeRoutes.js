const express = require('express')
const router = express.Router()
const db = require('../db/db')
const authMiddlware = require('../middleware/authMiddleware')



router.post('/create_employee',authMiddlware,(req,res)=>{
   const {name, age, gender} = req.body
   const sql = "INSERT INTO employee (name, age, gender) VALUES  (?, ?, ?)"
   db.query(sql,[name,age,gender],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "Success"}))
   })

})
router.get('/get_employee',authMiddlware,(req,res)=>{
   const sql = "SELECT * FROM employee "
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

router.get(`/view_employee/:id`,authMiddlware, (req,res)=>{
   const id = req.params.id
   const sql = "SELECT * FROM employee WHERE id = ?"
   db.query(sql,[id],(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

router.put(`/edit_employee/:id`,authMiddlware,(req,res)=>{
   const id = req.params.id
   const {name, age, gender} = req.body
   const sql = "UPDATE employee SET name = ?, age = ?, gender = ? where id = ?"
   db.query(sql,[name, age, gender,id],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "success"}))
   })
})


router.delete(`/delete_employee/:id`,authMiddlware,(req,res)=>{
   const id = req.params.id
   const sql = "DELETE FROM employee WHERE id = ?"
   db.query(sql,[id],(err,result)=>{
      return(err ? res.send(err) : res.send({message: "Deleted"}))
   })
})

router.get('/get_division',authMiddlware,(req,res)=>{
   const sql = 'SELECT * FROM division '
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})
router.get('/get_class',authMiddlware,(req,res)=>{
   const sql = 'SELECT * FROM class'
   db.query(sql,(err,result)=>{
      return(err ? res.send(err) : res.send(result))
   })
})

module.exports = router