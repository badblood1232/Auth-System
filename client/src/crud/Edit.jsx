import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Button, TextField, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from "@mui/material"

function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/view_employee/${id}`).then((res) => {
            setData(res.data[0])
        }).catch((err) => {
            console.log(err)
        })
    }, [])



    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3001/edit_employee/${id}`, data).then((res) => {
            alert(res.data.message)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })

        
    }

    return (
        <div>
            <h1>Edit</h1>
            <Button variant="outlined" component={Link} to='/' sx={{ margin: '10px 0' }}>Go Back</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Name:</TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={data.name || ''}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Age:</TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={data.age || ''}
                                    onChange={(e) => setData({ ...data, age: e.target.value })}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Gender:</TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={data.gender || ''}
                                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align="right">
                                <Button variant="contained" onClick={handleEdit}>Submit</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Edit
