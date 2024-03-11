require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

const users = require("./routes/users");
const cards = require("./routes/cards");
const sets = require("./routes/sets");
const tcgs = require("./routes/tcgs");
const checklists = require("./routes/checklists");

app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/cards", cards);
app.use("/api/sets", sets);
app.use("/api/tcgs", tcgs);
app.use("/api/checklists", checklists);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
