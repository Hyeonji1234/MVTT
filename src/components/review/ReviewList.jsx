import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewSection.module.css";

export default function ReviewList({
  movieId,
  refresh,
  filter,          // ✅ 추가
  selectedTag,     // ✅ 추가
  onTagClick,
  onCountChange,
  onRefresh,
}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        if (typeof onCountChange === "function") {
          onCountChange(data.length);
        }
      })
      .catch(console.error);
  }, [movieId, refresh, onCountChange]);

  // ✅ 필터 로직 (핵심)
  const filteredReviews = reviews.filter((r) => {
    // 1️⃣ 전체 / 스포일러 / 일반
    if (filter === "spoiler" && r.is_spoiler !== true) return false;
    if (filter === "normal" && r.is_spoiler !== false) return false;

    // 2️⃣ 태그 필터 (선택됐을 때만)
    if (selectedTag) {
      if (!Array.isArray(r.tags)) return false;
      if (!r.tags.includes(selectedTag)) return false;
    }

    return true;
  });

  if (!filteredReviews.length) {
    return (
      <div className={styles.empty}>
        조건에 맞는 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div>
      {filteredReviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          onTagClick={(tag) => onTagClick?.(tag)}
          onDeleteSuccess={() => onRefresh?.()}
          onUpdateSuccess={() => onRefresh?.()}
        />
      ))}
    </div>
  );
}
