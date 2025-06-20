import { useState,useEffect } from "react"
import{useNavigate,Link} from 'react-router-dom'
import axios from "axios"
import Alert from '@mui/material/Alert';
import{Avatar, Button, Grid,Paper, TextField, Typography} from '@mui/material'

import HowToRegIcon from '@mui/icons-material/HowToReg';
function Register(){

    const[data,setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
  axios.get('http://localhost:3001/')
    .then((res) => {
      if (res.data.Status === 'Success') {
        navigate('/home');
      }
    })
    .catch((err) => {
      console.log("please log in");
    });
}, [navigate]); 

    const handleSubmit = (e) =>{
        e.preventDefault()
      if(!data.email || !data.password){
        <Alert variant="filled" severity="Error">
        Input Fields
      </Alert>
      }else{
      axios.post('http://localhost:3001/register',data).then((res)=>{
          if(res.data.success){
            navigate('/')
          }
          else{
            alert(res.data.message)
          }
       
        }).catch((err)=>{
            console.log(err)
        })
      }
     
    }

    const paperStye = {padding: 20, height: "80vh", width: 288, margin: "20px auto"}
    const avatar = {backgroundColor: 'green'}
    const btnpass = {margin: '20px 0'}
    const log = {textAlign : 'right', margin: '10px 0'}

    return(
      <Grid>
        <Paper elevation={22} style={paperStye}>
         <Grid align="center">
       <Avatar style={avatar}><HowToRegIcon/></Avatar>
       <h1>Sign In</h1>
         </Grid>
        <TextField label = 'Username' type="text" required placeholder="Enter username" fullWidth onChange={(e)=>setData({...data, email: e.target.value})}></TextField>
        <TextField label = 'Password' type="password" required placeholder="Enter password" fullWidth style={btnpass} onChange={(e)=>setData({...data, password: e.target.value})}></TextField>
        <Button variant="contained" fullWidth onClick={handleSubmit}>Sign In</Button>
        <Typography style={log}>
          <Link to = '/login'>Log In</Link>
        </Typography>
        </Paper>
      </Grid>
       )





}
export default Register