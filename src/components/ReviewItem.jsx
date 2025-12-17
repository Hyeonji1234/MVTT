import { useState } from "react";
import styles from "../styles/Review.module.css";

export default function ReviewItem({ review }) {
  const [showSpoiler, setShowSpoiler] = useState(!review.is_spoiler);

  return (
    <div className={styles.reviewItem}>
      <div className={styles.header}>
        <span className={styles.nickname}>{review.nickname}</span>
        <span className={styles.date}>
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>

      <div
        className={`${styles.content} ${
          review.is_spoiler && !showSpoiler ? styles.spoiler : ""
        }`}
        onClick={() => setShowSpoiler(true)}
      >
        {review.content}
      </div>
    </div>
  );
}
