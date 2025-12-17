import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewSection.module.css";

export default function ReviewList({ movieId, refresh, onCountChange }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/reviews/${movieId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        onCountChange(data.length);
      });
  }, [movieId, refresh]);

  return (
    <>
      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <button className={styles.filterActive}>전체</button>
          <button>스포일러</button>
          <button>일반</button>
        </div>

        <select className={styles.sort}>
          <option>별점 높은순</option>
          <option>별점 낮은순</option>
          <option>최신순</option>
        </select>
      </div>

      {reviews.map(r => (
        <ReviewCard key={r.id} review={r} onDelete={() => setRefresh(v => v + 1)}/>
      ))}
    </>
  );
}
