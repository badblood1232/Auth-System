const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
const path = require('path')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  
})

const sqlpath = path.join(__dirname, '../database/schema.sql')
const sql = fs.readFileSync(sqlpath).toString()


db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_database}`,(err,result)=>{
    if (err) throw err
    console.log("table created")
})



const dbWithDatabase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_database,
})

dbWithDatabase.query(sql, (err, result) =>{
    if(err) throw err
    console.log('Database and table created!')
    dbWithDatabase.end()
})

module.exports = dbWithDatabase