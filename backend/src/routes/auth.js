import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).json({ message: "필수 항목 누락" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (email, password, nickname)
       VALUES (?, ?, ?)`,
      [email, hashedPassword, nickname]
    );

    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "이미 존재하는 이메일" });
    }
    res.status(500).json({ message: "서버 오류" });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  const user = rows[0];
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 계정" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "비밀번호 불일치" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      nickname: user.nickname,
    },
  });
});

export default router;
