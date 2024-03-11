const express = require("express");
const db = require("./db");
const app = express();
const validateToken = require("../middleware/validateToken");

app.post("/update", validateToken, async (req, res) => {
  const { cardId, username, status } = req.body;
  try {
    const checkEntryQuery = `SELECT * FROM checklists WHERE card_id = $1 AND username = $2`;
    const checkEntryResults = await db.query(checkEntryQuery, [cardId, user]);
    const entry = checkEntryResults.rows;

    // checklist record not found
    if (entry.length === 0) {
      await db.query(
        `INSERT INTO checklists (card_id, username) VALUES ($1, $2)`,
        [cardId, user]
      );
      res.status(200).json({ message: "Successfully added card to checklist" });
    }

    // checklist record found
    if (entry.length > 0) {
      await db.query(
        `DELETE FROM checklists WHERE card_id = $1 AND username = $2`,
        [cardId, user]
      );
      res
        .status(200)
        .json({ message: "Successfully removed card from checklist" });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error inserting checklist record into database",
      details: e,
    });
  }
});

app.get("/username/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const userQuery = await db.query(
      `SELECT * FROM users WHERE username = $1 LIMIT 1`,
      [username]
    );

    const userResult = userQuery.rows[0];

    // no matching username found
    if (!userResult) {
      res.status(400).json({ message: "User does not exist" });
    }

    // username found
    if (userResult) {
      if (userResult.is_checklist_private) {
        res.status(401).json({ message: "User checklist is private" });
        return;
      }

      const userChecklist = await db.query(
        `SELECT * FROM checklists 
        LEFT JOIN cards 
        ON checklists.card_id = cards.id 
        WHERE checklists.username = $1`,
        [username]
      );
      res.status(200).json(userChecklist.rows);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error retrieving user checklist",
      details: e,
    });
  }
});

module.exports = app;
