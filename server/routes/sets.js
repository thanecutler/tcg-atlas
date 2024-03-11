const express = require("express");
const db = require("./db");
const app = express();

app.get("/id/:id", async (req, res) => {
  const setId = req.params.id;
  try {
    console.log(req.headers);
    if (req.headers.authorization) {
    }
    const query = "SELECT * FROM tcg_sets WHERE id = $1";
    const { rows } = await db.query(query, [setId]);

    const setData = rows[0];
    if (rows.length === 0) {
      return res.status(404).json({ message: "Set not found" });
    }

    const cardQuery = `SELECT * FROM ${setData.parent_tcg} WHERE parent_set_id = $1 ORDER BY set_number ASC`;
    const cards = await db.query(cardQuery, [setId]);
    setData.card_count = cards.rows.length;
    res.status(200).json({ setMetadata: setData, cardData: cards.rows });
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
