import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = (username) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/users/login`,
        formData
      );
      localStorage.setItem("username", response.data.username);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error", error);
    }
  };

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <AccountCircle style={{ fontSize: "64px", color: "#1976D2" }} />
        </div>
        <Typography variant='h5' align='center'>
          Login
        </Typography>
        <TextField
          fullWidth
          label='Username'
          name='username'
          variant='outlined'
          margin='normal'
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label='Password'
          name='password'
          type='password'
          variant='outlined'
          margin='normal'
          value={formData.password}
          onChange={handleChange}
        />
        <Typography variant='body2' color='error' align='center'>
          {errorMessage}
        </Typography>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Login
        </Button>
      </form>
      <Typography marginTop={2}>
        Don't have an account?{" "}
        <Link
          to={"/register"}
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Sign up
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
