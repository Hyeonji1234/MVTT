import express from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * 리뷰 작성 (로그인 필수)
 */
router.post("/", authMiddleware, async (req, res) => {
  const { movieId, content, isSpoiler } = req.body;
  const userId = req.userId;

  if (!movieId || !content) {
    return res.status(400).json({ message: "필수 값 누락" });
  }

  try {
    await pool.query(
      `INSERT INTO reviews (user_id, movie_id, content, is_spoiler)
       VALUES (?, ?, ?, ?)`,
      [userId, movieId, content, isSpoiler ? 1 : 0]
    );

    res.status(201).json({ message: "리뷰 작성 완료" });
  } catch (err) {
    console.error("REVIEW CREATE ERROR:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

/**
 * 영화별 리뷰 조회
 */
router.get("/movie/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT r.id, r.content, r.is_spoiler, r.created_at,
             u.nickname
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.movie_id = ?
      ORDER BY r.created_at DESC
      `,
      [movieId]
    );

    res.json(rows);
  } catch (err) {
    console.error("REVIEW FETCH ERROR:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

export default router;
