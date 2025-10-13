
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const app = express()
app.use(express.json())
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))

app.use(cookieParser())


app.use("/user",userRoutes)
app.use("/employee",employeeRoutes)