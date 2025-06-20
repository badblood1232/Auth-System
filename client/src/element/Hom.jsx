import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, email } = useSelector((state) => state.auth);


  const fetchData = () => {
    axios
      .get("http://localhost:3001/get_employee")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleLogout = () => {
    axios.get("http://localhost:3001/logout").then((res) => {
      alert(res.data.Status)
      localStorage.removeItem("userToken"); 
      localStorage.removeItem("userEmail"); 
      dispatch(logout());
      navigate("/login");
    });
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:3001/delete_employee/${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ p: 4 }}>
      {isAuthenticated ? (
        <>
          <Typography variant="h5" gutterBottom>
            You Are Authorized: {email}
          </Typography>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" component={Link} to="/create" sx={{ mr: 2 }}>
              Create
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Log Out
            </Button>
            <TextField
              label="Search"
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mx: "auto", width: 300 }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>View</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter((d) =>
                    search.toLowerCase() === ""
                      ? true
                      : d.name.toLowerCase().includes(search)
                  )
                  .map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.age}</TableCell>
                      <TableCell>{d.gender}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemove(d.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="text" component={Link} to={`/view/${d.id}`}>
                          View
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="text" component={Link} to={`/edit/${d.id}`}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box>
          <Typography variant="h4">You are not Authorized</Typography>
          <Button variant="contained" component={Link} to="/login">
            Go to Login
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Home;
