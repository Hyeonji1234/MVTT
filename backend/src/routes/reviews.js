import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * 리뷰 작성
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, rating, content, spoiler } = req.body;
    const userId = req.user.id;

    await pool.query(
      `INSERT INTO reviews (movie_id, user_id, rating, content, is_spoiler)
       VALUES (?, ?, ?, ?, ?)`,
      [movieId, userId, rating, content, spoiler]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("❌ REVIEW INSERT ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/**
 * 영화별 리뷰 조회
 */
router.get("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    const [rows] = await pool.query(
      `SELECT 
         r.id,
         r.movie_id,
         r.user_id,      
         r.rating,
         r.content,
         r.is_spoiler,
         r.created_at,
         u.nickname,
          COUNT(rl.id) AS like_count
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       LEFT JOIN review_likes rl ON r.id = rl.review_id
       WHERE r.movie_id = ?
       GROUP BY r.id
       ORDER BY r.created_at DESC`,
      [movieId]
);


    res.json(rows);
  } catch (err) {
    console.error("❌ REVIEW SELECT ERROR:", err);
    res.status(500).json([]);
  }
});

// 리뷰 삭제 (작성자만)
router.delete("/:id", authMiddleware, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      "DELETE FROM reviews WHERE id = ? AND user_id = ?",
      [reviewId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "권한 없음" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// 좋아요 토글
router.post("/:id/like", authMiddleware, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      "SELECT id FROM review_likes WHERE review_id = ? AND user_id = ?",
      [reviewId, userId]
    );

    if (rows.length > 0) {
      // 이미 좋아요 → 취소
      await pool.query(
        "DELETE FROM review_likes WHERE review_id = ? AND user_id = ?",
        [reviewId, userId]
      );
    } else {
      // 좋아요 추가
      await pool.query(
        "INSERT INTO review_likes (review_id, user_id) VALUES (?, ?)",
        [reviewId, userId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("좋아요 오류:", err);
    res.status(500).json({ success: false });
  }
});



export default router;
