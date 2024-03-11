const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DATABASE_USER,
  host: "localhost",
  database: "postgres",
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

module.exports = db;
