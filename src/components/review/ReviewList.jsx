import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewSection.module.css";

export default function ReviewList({ movieId, refresh, onCountChange, onRefresh }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/reviews/${movieId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        if (typeof onCountChange === "function") onCountChange(data.length);
      })
      .catch(console.error);
  }, [movieId, refresh, onCountChange]);

  if (!reviews.length) {
    return <div className={styles.empty}>아직 작성된 리뷰가 없습니다.</div>;
  }

  return (
    <div>
      {reviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          onDeleteSuccess={() => onRefresh?.()}
          onUpdateSuccess={() => onRefresh?.()}
        />
      ))}
    </div>
  );
}
