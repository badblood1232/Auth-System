import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice"; 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
   
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userEmail", res.data.email);
         
          dispatch(
            loginSuccess({
              email: res.data.email,
              token: res.data.token,
            })
          );
          navigate("/home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const paperStye = {
    padding: 20,
    minHeight: "80vh",
    width: 280,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={21} style={paperStye}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "green" }}>
            <LockOutlineIcon />
          </Avatar>
          <h1>LOGIN</h1>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          sx={{ my: 2 }}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Typography align="right" sx={{ mt: 1 }}>
          <Link to="/register">Register now</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;