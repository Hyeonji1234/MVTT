import express from "express";
import pool from "../db.js";

const router = express.Router();

// ✅ GET /tags
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM tags ORDER BY id"
    );

    console.log("✅ TAGS ROWS:", rows);
    res.json(rows);
  } catch (err) {
    console.error("❌ TAGS ERROR:", err);
    res.status(500).json([]);
  }
});

export default router;
