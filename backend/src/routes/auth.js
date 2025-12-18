import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../db.js";

import cors from "cors";

const router = express.Router();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin === "https://mvtt.vercel.app" ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsOptions));
router.options("*", cors(corsOptions));

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

// ✅ 회원가입
router.post("/signup", async (req, res) => {
  try {
    // 프론트에서는 name으로 보내도 되고 nickname으로 보내도 되게 처리
    const { name, nickname, email, password } = req.body;
    const finalNickname = (nickname ?? name ?? "").trim();
    const finalEmail = (email ?? "").trim();

    if (!finalNickname || !finalEmail || !password) {
      return res.status(400).json({ message: "필수 값이 누락되었습니다." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "비밀번호는 최소 6자입니다." });
    }

    // 이메일 중복 확인
    const [exists] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [finalEmail]
    );
    if (exists.length > 0) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      [finalEmail, hashed, finalNickname]
    );

    const user = { id: result.insertId, email: finalEmail, nickname: finalNickname };
    const token = signToken(user);

    return res.status(201).json({
      message: "회원가입 성공",
      token,
      user,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQ BODY:", req.body);

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log("DB USER RESULT:", users);

    if (users.length === 0) {
      return res.status(400).json({ message: "이메일 없음" });
    }

    const user = users[0];

    console.log("INPUT PASSWORD:", password);
    console.log("DB PASSWORD:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호 불일치" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
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
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;



