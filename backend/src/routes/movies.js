import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/upsert", async (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    return res.status(400).json({ message: "id and title required" });
  }

  try {
    await pool.query(
      `
      INSERT INTO movies (id, title)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE title = VALUES(title)
      `,
      [id, title]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("MOVIE UPSERT ERROR:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
