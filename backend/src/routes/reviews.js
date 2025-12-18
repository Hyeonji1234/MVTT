import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

/** 토큰 있으면 user 넣어주기(없으면 그냥 통과) */
function optionalUser(req, _res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return next();
  try {
    const token = auth.slice(7);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // 토큰 깨져도 비로그인으로 처리
  }
  next();
}

/** 토큰 필수 */
function requireUser(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  try {
    const token = auth.slice(7);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
}

/**
 * 🔥 GET /reviews/spoilers
 * 모든 영화의 스포일러 리뷰 (최신순)
 * ⚠️ 반드시 /:movieId 보다 위에 있어야 함
 */
router.get("/spoilers", optionalUser, async (req, res) => {
  const myId = req.user?.id || null;

  try {
    const [rows] = await pool.query(
      `
      SELECT
        r.id,
        r.movie_id,
        r.user_id,
        u.nickname AS username,
        r.rating,
        r.content,
        r.is_spoiler,
        r.created_at,
        COUNT(DISTINCT rl.id) AS like_count,
        MAX(CASE WHEN rl.user_id = ? THEN 1 ELSE 0 END) AS liked,
        GROUP_CONCAT(DISTINCT t.name ORDER BY t.id SEPARATOR ',') AS tags
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      LEFT JOIN review_likes rl ON rl.review_id = r.id
      LEFT JOIN review_tags rt ON rt.review_id = r.id
      LEFT JOIN tags t ON t.id = rt.tag_id
      WHERE r.is_spoiler = 1
      GROUP BY r.id
      ORDER BY r.created_at DESC
      LIMIT 50
      `,
      [myId]
    );

    const result = rows.map((r) => ({
      ...r,
      like_count: Number(r.like_count) || 0,
      liked: Number(r.liked) === 1,
      tags: r.tags ? r.tags.split(",") : [],
    }));

    res.json(result);
  } catch (err) {
    console.error("SPOILERS GET ERROR:", err);
    res.status(500).json({ message: "스포일러 조회 실패" });
  }
});

/**
 * GET /reviews/:movieId
 * - like_count, liked(내가 눌렀는지), tags(스포일러 태그들) 포함
 */
router.get("/:movieId", optionalUser, async (req, res) => {
  const movieId = Number(req.params.movieId);
  const myId = req.user?.id || null;

  try {
    const [rows] = await pool.query(
      `
      SELECT
        r.id,
        r.movie_id,
        m.title AS movie_title,   -- ⭐ 추가
        r.user_id,
        u.nickname AS username,
        r.rating,
        r.content,
        r.is_spoiler,
        r.created_at,
        COUNT(DISTINCT rl.id) AS like_count,
        MAX(CASE WHEN rl.user_id = ? THEN 1 ELSE 0 END) AS liked,
        GROUP_CONCAT(DISTINCT t.name ORDER BY t.id SEPARATOR ',') AS tags
      FROM reviews r
      JOIN movies m ON r.movie_id = m.id      -- ⭐ 추가
      JOIN users u ON r.user_id = u.id
      LEFT JOIN review_likes rl ON rl.review_id = r.id
      LEFT JOIN review_tags rt ON rt.review_id = r.id
      LEFT JOIN tags t ON t.id = rt.tag_id
      WHERE r.is_spoiler = 1
      GROUP BY r.id
      ORDER BY r.created_at DESC
      LIMIT 50
      `,
      [myId, movieId]
    );

    // liked를 0/1 숫자로 보정
    const result = rows.map((x) => ({
      ...x,
      liked: Number(x.liked) === 1,
      like_count: Number(x.like_count) || 0,
      tags: x.tags ? x.tags.split(",") : [],
    }));

    res.json(result);
  } catch (err) {
    console.error("REVIEWS GET ERROR:", err);
    res.status(500).json({ message: "리뷰 조회 실패" });
  }
});

/**
 * POST /reviews
 * body: { movie_id, rating, content, is_spoiler, tag_ids: number[] }
 */
router.post("/", requireUser, async (req, res) => {
  const { movie_id, rating, content, is_spoiler, tag_ids } = req.body;
  const user_id = req.user.id;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO reviews (movie_id, user_id, rating, content, is_spoiler)
      VALUES (?, ?, ?, ?, ?)
      `,
      [movie_id, user_id, rating, content, is_spoiler ? 1 : 0]
    );

    const reviewId = result.insertId;

    // 스포일러 체크된 경우에만 태그 저장
    if (is_spoiler && Array.isArray(tag_ids) && tag_ids.length > 0) {
      const values = tag_ids.map((tid) => [reviewId, tid]);
      await pool.query(
        "INSERT INTO review_tags (review_id, tag_id) VALUES ?",
        [values]
      );
    }

    res.status(201).json({ success: true, id: reviewId });
  } catch (err) {
    console.error("REVIEWS POST ERROR:", err);
    res.status(500).json({ message: "리뷰 작성 실패" });
  }
});

/**
 * PUT /reviews/:id  (본인만)
 * body: { rating, content, is_spoiler, tag_ids }
 */
router.put("/:id", requireUser, async (req, res) => {
  const reviewId = Number(req.params.id);
  const userId = req.user.id;
  const { rating, content, is_spoiler, tag_ids } = req.body;

  try {
    const [own] = await pool.query("SELECT user_id FROM reviews WHERE id = ?", [
      reviewId,
    ]);
    if (own.length === 0) return res.status(404).json({ message: "리뷰 없음" });
    if (own[0].user_id !== userId)
      return res.status(403).json({ message: "권한 없음" });

    await pool.query(
      "UPDATE reviews SET rating=?, content=?, is_spoiler=? WHERE id=?",
      [rating, content, is_spoiler ? 1 : 0, reviewId]
    );

    // 태그는 일단 싹 지우고 재삽입(가장 안전)
    await pool.query("DELETE FROM review_tags WHERE review_id = ?", [reviewId]);
    if (is_spoiler && Array.isArray(tag_ids) && tag_ids.length > 0) {
      const values = tag_ids.map((tid) => [reviewId, tid]);
      await pool.query(
        "INSERT INTO review_tags (review_id, tag_id) VALUES ?",
        [values]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("REVIEWS PUT ERROR:", err);
    res.status(500).json({ message: "리뷰 수정 실패" });
  }
});

/**
 * DELETE /reviews/:id (본인만)
 */
router.delete("/:id", requireUser, async (req, res) => {
  const reviewId = Number(req.params.id);
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      "DELETE FROM reviews WHERE id = ? AND user_id = ?",
      [reviewId, userId]
    );
    if (result.affectedRows === 0)
      return res.status(403).json({ message: "권한 없음" });
    res.json({ success: true });
  } catch (err) {
    console.error("REVIEWS DELETE ERROR:", err);
    res.status(500).json({ message: "리뷰 삭제 실패" });
  }
});

/**
 * POST /reviews/:id/like
 * - 토글
 * - 결과로 {liked, like_count} 내려줌 (프론트 즉시 반영 가능)
 */
router.post("/:id/like", requireUser, async (req, res) => {
  const reviewId = Number(req.params.id);
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      "SELECT id FROM review_likes WHERE review_id=? AND user_id=?",
      [reviewId, userId]
    );

    let liked;
    if (rows.length > 0) {
      await pool.query(
        "DELETE FROM review_likes WHERE review_id=? AND user_id=?",
        [reviewId, userId]
      );
      liked = false;
    } else {
      await pool.query(
        "INSERT INTO review_likes (review_id, user_id) VALUES (?, ?)",
        [reviewId, userId]
      );
      liked = true;
    }

    const [[cnt]] = await pool.query(
      "SELECT COUNT(*) AS like_count FROM review_likes WHERE review_id=?",
      [reviewId]
    );

    res.json({ success: true, liked, like_count: Number(cnt.like_count) });
  } catch (err) {
    console.error("LIKE TOGGLE ERROR:", err);
    res.status(500).json({ message: "좋아요 실패" });
  }
});

export default router;
