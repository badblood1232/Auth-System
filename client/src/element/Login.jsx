import React from "react"
import {useState} from 'react'
import axios from 'axios'
import './login.css'
function Login(){
  
  const [data,setData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3001/login',data)
      alert(res.data.message)
    }catch(err){
      console.log(`Login Error ${err}`)
      alert("Something Happened Check something")
    }
  }


  return(

    <div className="login-container">
   
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <label>Username</label>
        <input type="text" onChange={(e)=> setData({...data, username: e.target.value})}></input>
        <label>Password</label>
        <input type="password" onChange={(e) => setData({...data, password: e.target.value})}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  
)
}

export default Login
