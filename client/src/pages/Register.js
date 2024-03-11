import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }
    if (!validateEmail(formData.email)) {
      return setErrorMessage("Invalid email format");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/users/login`,
        formData
      );
      console.log("Registration successful", response.data);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error", error);
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
          Register
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
          label='Email'
          name='email'
          type='email'
          variant='outlined'
          margin='normal'
          value={formData.email}
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
        <TextField
          fullWidth
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          variant='outlined'
          margin='normal'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Typography variant='body2' color='error' align='center'>
          {errorMessage}
        </Typography>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
