import { useState, useEffect } from "react"
import axios from "axios"
import { Button, Grid, Paper, TextField, Select, MenuItem } from '@mui/material'
import { useNavigate } from "react-router-dom"

function Create() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        age: '',
        gender: '',
        division: '',
        class: ''
    })
    const [division, setDivision] = useState([])
    const [classs, setClasss] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.name === '' || data.age === '' || data.gender === '' || data.division === '') {
            alert("Please fill in all fields")
        } else {
            axios.post('http://localhost:3001/create_employee', data)
                .then((res) => {
                    alert(res.data.message)
                    navigate('/home')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

  useEffect(()=>{
    axios.get('http://localhost:3001/get_division').then((res)=>{
        setDivision(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:3001/get_class').then((res)=>{
        setClasss(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  },[])
     const getFilteredClasses = () => {
    if (data.division === 'Web') {
    return classs.filter(c => c.class === 'Division 1' || c.class === 'Division 2');
  } else if (data.division === 'Mobile') {
    return classs.filter(c => c.class === 'Class 3' || c.class === 'Class 4');
  } else {
    return [];
  }
};

   

    const paperStyle = { padding: 10, width: 288, minHeight: "81vh", margin: "20px auto" }

    return (
        <Grid>
            <Paper elevation={21} style={paperStyle}>
                <h1>Create</h1>
                <Grid>
                    <TextField label='Name' fullWidth onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <TextField label='Age' type="number" fullWidth sx={{ margin: "12px 0" }} onChange={(e) => setData({ ...data, age: e.target.value })} />
                    <TextField label='Gender' fullWidth sx={{ margin: "5px 0" }} onChange={(e) => setData({ ...data, gender: e.target.value })} />
                    <Select
                        value={data.division}
                        onChange={(e) => setData({ ...data, division: e.target.value })}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select Division</MenuItem>
                        {division.map((div, index) => (
                            <MenuItem value={div.name} key={index}>{div.name}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={data.class}
                        onChange={(e) => setData({ ...data, class: e.target.value})}
                        fullWidth
                        displayEmpty
                        disabled={!data.division} 
                    >
                        <MenuItem value="" disabled>Select Class</MenuItem>
                        {getFilteredClasses().map((c, index) => (
                            <MenuItem value={c.class} key={index}>{c.class}</MenuItem>
                        ))}
                    </Select>
                    <br />
                    <Button variant="contained" fullWidth sx={{ margin: "5px 0" }} onClick={handleSubmit}  disabled={!data.name || !data.age || !data.gender || !data.division|| !data.class}>Submit</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Create
