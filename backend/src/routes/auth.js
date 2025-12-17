import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

/**
 * 회원가입
 * POST /auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. 유효성 검사
    if (!name || !email || !password) {
      return res.status(400).json({ message: "모든 값을 입력해주세요." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "비밀번호는 6자 이상이어야 합니다." });
    }

    // 2. 이메일 중복 체크
    const [exist] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 3. 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 사용자 저장 (🔥 nickname 컬럼 사용)
    await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [email, hashedPassword, name]
    );

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

/**
 * 로그인
 * POST /auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "이메일과 비밀번호를 입력하세요." });
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "존재하지 않는 계정입니다." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;
