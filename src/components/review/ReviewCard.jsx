import { useState } from "react";
import styles from "./ReviewSection.module.css";

export default function ReviewCard({ review, onDelete }) {
  // 🔹 (1) 스포일러 상태
  const [showSpoiler, setShowSpoiler] = useState(false);

  // 🔹 (2) 로그인 유저 id (로그인 시 localStorage에 저장돼 있다고 가정)
  const myId = Number(localStorage.getItem("userId"));

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

      {/* ===== 하단: 날짜 + 삭제 버튼 ===== */}
      <div className={styles.reviewFooter}>
        <span>
          {new Date(review.created_at).toLocaleDateString()}
        </span>

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
  );
}
