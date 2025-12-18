import express from "express";
import pool from "../db.js";

const router = express.Router();

/**
 * GET /tags
 * return: [{id, name}, ...]
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name FROM tags ORDER BY id");
    res.json(rows); // ✅ 배열
  } catch (err) {
    console.error("TAGS GET ERROR:", err);
    res.status(500).json({ message: "태그 조회 실패" });
  }
});

export default router;
