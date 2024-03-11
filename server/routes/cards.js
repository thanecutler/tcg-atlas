const express = require("express");
const db = require("./db");
const app = express();

app.get("/id/:id", async (req, res) => {
  const cardId = req.params.id;

  try {
    const cardLookupQuery = "SELECT * FROM cards WHERE id = $1 LIMIT 1";
    const cardLookupResults = await db.query(cardLookupQuery, [cardId]);

    if (cardLookupResults.rows.length === 0) {
      return res.status(404).json({ message: "Card not found" });
    }
    const parent_tcg = cardLookupResults.rows[0].parent_tcg;
    const metadataQuery = `SELECT * FROM ${parent_tcg} WHERE id = $1`;
    const cardMetadata = await db.query(metadataQuery, [cardId]);
    const result = cardMetadata.rows[0];

    res.status(200).json({ ...result, parent_tcg });
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
