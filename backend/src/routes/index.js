import express from "express";
import pool from "../db.js";

const router = express.Router();

/* 서버 테스트 */
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

/* DB 연결 테스트 */
router.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ success: true, rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
