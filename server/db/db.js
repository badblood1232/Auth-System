const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: proccess.env.DB_USER,
    password: proccess.env.DB_PASS,
    database: process.env.DB_database,
})

module.exports = db