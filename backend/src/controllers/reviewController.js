import { db } from "../db.js";

/**
 * 리뷰 작성
 */
export const createReview = async (req, res) => {
  const { movie_id, content, is_spoiler, tags } = req.body;
  const user_id = req.user.id;

  if (!movie_id || !content) {
    return res.status(400).json({ message: "필수 값이 누락되었습니다." });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 리뷰 저장
    const [reviewResult] = await conn.query(
      `INSERT INTO reviews (movie_id, user_id, content, is_spoiler)
       VALUES (?, ?, ?, ?)`,
      [movie_id, user_id, content, is_spoiler ? 1 : 0]
    );

    const reviewId = reviewResult.insertId;

    // 태그 연결
    if (Array.isArray(tags)) {
      for (const tagId of tags) {
        await conn.query(
          `INSERT INTO review_tags (review_id, tag_id)
           VALUES (?, ?)`,
          [reviewId, tagId]
        );
      }
    }

    await conn.commit();
    res.status(201).json({ message: "리뷰 작성 완료" });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "리뷰 작성 실패" });
  } finally {
    conn.release();
  }
};

/**
 * 영화별 리뷰 조회
 */
export const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  const [reviews] = await db.query(
    `
    SELECT 
      r.id,
      r.content,
      r.is_spoiler,
      r.created_at,
      u.nickname,
      COUNT(rl.id) AS likeCount
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    LEFT JOIN review_likes rl ON rl.review_id = r.id
    WHERE r.movie_id = ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
    `,
    [movieId]
  );

  res.json(reviews);
};
