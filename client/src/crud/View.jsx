import { useState,useEffect } from "react"
import axios from "axios"
import { useParams,Link } from "react-router-dom"

function View(){
const {id} = useParams()
const [data, setData] = useState([])

useEffect(()=>{
    axios.get(`http://localhost:3001/view_employee/${id}`).then((res)=>{
        setData(res.data[0])
    }).catch((err)=>{
        console.log(err)
    })
},[])




return(<div>
    <Link to='/home'>Go Back</Link>
    <table>
        <thead>
            <tr>
                <th>{data.name}</th>
                <th>{data.age}</th>
                <th>{data.gender}</th>
            </tr>
        </thead>
    </table>
</div>)
}
export default View