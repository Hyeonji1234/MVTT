import { useState } from "react";
import styles from "./ReviewSection.module.css";

export default function ReviewCard({ review, onDelete }) {
  // 🔹 (1) 스포일러 상태
  const [showSpoiler, setShowSpoiler] = useState(false);

  // 🔹 (2) 로그인 유저 id (로그인 시 localStorage에 저장돼 있다고 가정)
  const user = JSON.parse(localStorage.getItem("user"));
  const myId = user?.id;

  // 🔹 (3) 리뷰 삭제 함수
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!confirm("리뷰를 삭제할까요?")) return;

    await fetch(`http://localhost:4000/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    onDelete(); // 목록 새로고침
  };

  const [likeCount, setLikeCount] = useState(review.likeCount || 0);
  const [liked, setLiked] = useState(false);
  
  const toggleLike = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }

  await fetch(
    `http://localhost:4000/reviews/${review.id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setLiked((prev) => !prev);
  setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
};


  
  console.log("review.user_id:", review.user_id);
  console.log("myId:", myId);


  return (
    <div className={styles.reviewCard}>
      {/* ===== 상단: 닉네임 + 별점 ===== */}
      <div className={styles.reviewHeader}>
        <strong>{review.nickname}</strong>
        <span className={styles.score}>
          {"★".repeat(review.rating)}
        </span>
      </div>

      {/* ===== 본문: 스포일러 처리 ===== */}
      <p
        className={
          review.is_spoiler && !showSpoiler
            ? styles.spoiler
            : ""
        }
        onClick={() => {
          if (review.is_spoiler) setShowSpoiler(true);
        }}
      >
        {review.content}
      </p>

      {/* ===== 하단: 작성일 + 좋아요/삭제 ===== */}
      
      <div className={styles.reviewFooter}>
        <span>{new Date(review.created_at).toLocaleDateString()}</span>

        <div className={styles.actions}>
          <button
            className={styles.like}
            onClick={toggleLike}
          >
            ❤️ {likeCount}
          </button>
    {/* 🔥 본인 리뷰일 때만 삭제 버튼 */}
    {review.user_id === myId && (
      <button
        className={styles.delete}
        onClick={handleDelete}
      >
        삭제
      </button>
    )}
  </div>
</div>

    </div>
  );
}
