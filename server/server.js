
const cors = require('cors')

const express = require('express')

const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const app = express()
app.use(express.json())
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))




app.use("/user",userRoutes)

app.use("/employee",employeeRoutes)

app.listen(3001,()=>{
    console.log("listening")
})
