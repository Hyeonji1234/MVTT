import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewSection.module.css";

export default function ReviewList({ movieId, refresh, onCountChange }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/reviews/${movieId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        onCountChange?.(data.length);  // ⭐ 여기!!
      });
  }, [movieId, refresh]);

  if (reviews.length === 0) {
    return <div className={styles.empty}>아직 작성된 리뷰가 없습니다.</div>;
  }

  return (
    <>
      <div className={styles.filterBar}>
        <div>
          <button className={styles.active}>전체</button>
          <button>스포일러</button>
          <button>일반</button>
        </div>

        <select>
          <option>최신순</option>
          <option>별점순</option>
        </select>
      </div>

      {reviews.map(r => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </>
  );
}
