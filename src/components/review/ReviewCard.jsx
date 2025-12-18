import { useEffect, useMemo, useState } from "react";
import styles from "./ReviewSection.module.css";

function getMyIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    return null;
  }
}

export default function ReviewCard({ 
  review, 
  onDeleteSuccess, 
  onUpdateSuccess,
  onTagClick, 
}) {
  const token = localStorage.getItem("token");
  const myId = useMemo(() => getMyIdFromToken(), []);

  const [liked, setLiked] = useState(!!review.liked);
  const [likeCount, setLikeCount] = useState(review.like_count || 0);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);

  const [showSpoiler, setShowSpoiler] = useState(false);

  useEffect(() => {
    setLiked(!!review.liked);
    setLikeCount(review.like_count || 0);
  }, [review.liked, review.like_count]);

  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  const tagList = Array.isArray(review.tags)
  ? review.tags
  : typeof review.tags === "string" && review.tags.length > 0
    ? review.tags.split(",")
    : [];



  const toggleLike = async () => {
    if (!token) return alert("로그인이 필요합니다.");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${review.id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    setLiked(data.liked);
    setLikeCount(data.like_count);
  };

  const deleteReview = async () => {
    if (!token) return alert("로그인이 필요합니다.");

    await fetch(`${API_BASE}/reviews/${review.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    onDeleteSuccess?.();
  };

  const save = async () => {
    if (!token) return alert("로그인이 필요합니다.");

    await fetch(`${API_BASE}/reviews/${review.id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating,
        content,
        is_spoiler: review.is_spoiler,
        tag_ids: [], // (수정화면에서 태그 편집까지 하려면 여기 확장)
      }),
    });

    setEditing(false);
    onUpdateSuccess?.();
  };

  console.log("is_spoiler:", review.is_spoiler, "tags:", review.tags);

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontWeight: 700 }}>{review.username}</div>

          {review.is_spoiler === 1 && tagList.length > 0 && (
            <div className={styles.spoilerTags}>
              {tagList.map((t) => (
                <span 
                key={t}
                className={styles.spoilerTag}
                onClick={() => onTagClick?.(t)}
                style={{cursor: "pointer"}}
              >
                  #{t}
                </span>
              ))}
            </div>
          )}

        </div>

        <div className={styles.score}>
          {stars} {review.rating}점
        </div>
      </div>

      {!editing ? (
        <div
          className={`${styles.reviewContent} ${
            review.is_spoiler && !showSpoiler ? styles.spoiler : ""
          }`}
          onClick={() => review.is_spoiler && setShowSpoiler(true)}
          title={review.is_spoiler && !showSpoiler ? "클릭하면 스포일러를 볼 수 있어요" : ""}
        >
          {review.content}
        </div>
      ) : (
        <>
          <select
            className={styles.ratingSelect}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>★★★★★ 5점</option>
            <option value={4}>★★★★☆ 4점</option>
            <option value={3}>★★★☆☆ 3점</option>
            <option value={2}>★★☆☆☆ 2점</option>
            <option value={1}>★☆☆☆☆ 1점</option>
          </select>

          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </>
      )}

      <div className={styles.reviewFooter}>
        <span>{(review.created_at || "").slice(0, 10)}</span>

        <div className={styles.actions}>
          <button className={styles.like} onClick={toggleLike} type="button">
            {liked ? "❤️" : "🤍"} <span style={{ marginLeft: 6 }}>{likeCount}</span>
          </button>

          {myId === review.user_id && (
            <>
              {!editing ? (
                <>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => setEditing(true)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={deleteReview}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={save}
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => setEditing(false)}
                  >
                    취소
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
