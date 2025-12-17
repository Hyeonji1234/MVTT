import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js";

const router = express.Router();

/**
 * 회원가입
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("REQ BODY:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "필수 값 누락" });
    }

    // 이메일 중복 체크
    const [exist] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 이메일" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [email, hashed, username]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

export default router;
