const express = require("express");
const db = require("./db");
const app = express();

app.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tcgQuery = `SELECT * FROM tcgs WHERE id = $1`;
    const tcgData = await db.query(tcgQuery, [id]);
    if (tcgData.rows.length === 0) {
      return res.status(404).json({ message: "Set not found" });
    }

    const result = tcgData.rows[0];

    const tcgSets = await db.query(
      `SELECT * FROM tcg_sets WHERE parent_tcg = $1 ORDER BY id ASC`,
      [result.name]
    );
    res.status(200).json({ ...result, sets: tcgSets.rows });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

app.get("/all", async (req, res) => {
  try {
    const tcgData = await db.query(`SELECT * FROM tcgs`);
    res.status(200).json(tcgData.rows);
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = app;
