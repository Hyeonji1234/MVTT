import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/tags", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM tags ORDER BY id"
    );

    console.log("✅ TAGS ROWS:", rows);

    return res.json(rows);
  } catch (err) {
    console.error("❌ TAGS ERROR:", err);
    return res.status(500).json([]);
  }
});

export default router;
