import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

/**
 * 회원가입
 */
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1️⃣ 필수값 체크
    if (!email || !password || !username) {
      return res.status(400).json({
        message: "이메일, 비밀번호, 닉네임은 필수입니다.",
      });
    }

    // 2️⃣ 이메일 중복 체크
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "이미 가입된 이메일입니다.",
      });
    }

    // 3️⃣ 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ 회원 생성
    await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [email, hashedPassword, username]
    );

    return res.status(201).json({
      message: "회원가입 성공",
    });
  } catch (error) {
    console.error("SIGNUP ERROR FULL:", error);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
});

export default router;
