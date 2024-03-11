const express = require("express");
const db = require("./db");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  // validate email format

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // return 400 if email doesn't validate

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  try {
    // confirm username does not already exist, return 400 if it does

    const userQuery = `SELECT * FROM users WHERE username = $1`;
    const foundUser = await db.query(userQuery, [username]);
    if (foundUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // confirm email does not already exist, return 400 if it does

    const emailQuery = `SELECT * FROM users WHERE email = $1`;
    const foundEmail = await db.query(emailQuery, [email]);
    if (foundEmail.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
      const createUserQuery = `INSERT INTO users (username, password, email) VALUES ($1,  $2, $3)`;
      db.query(createUserQuery, [username, hash, email]);
    });
    return res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Error processing user registration" });
  } finally {
    return console.log("Finally clause reached for registration");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userQuery = `SELECT * FROM users WHERE username = $1`;
    const foundUser = await db.query(userQuery, [username]);
    if (foundUser.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    bcrypt.compare(
      password,
      foundUser.rows[0].password,
      function (err, result) {
        if (result === true) {
          const token = jwt.sign({ username: username }, "your-secret-key", {
            expiresIn: "1w",
          });
          return res
            .status(200)
            .json({ message: "Logged in successfully", token, username });
        }
        if (result !== true) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      }
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error processing login" });
  }
});

module.exports = app;
