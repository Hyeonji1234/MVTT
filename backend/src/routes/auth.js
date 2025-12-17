import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

/**
 * 회원가입
 * POST /auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "필수값 누락" });
    }

    // 이메일 중복 체크
    const [exist] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.status(409).json({ message: "이미 존재하는 이메일" });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [email, hashedPassword, name]
    );

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;
