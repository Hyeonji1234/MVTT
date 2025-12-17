import styles from "./ReviewSection.module.css";

export default function ReviewCard({ review }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <strong>11</strong>
        <span className={styles.rating}>
          {"★".repeat(review.rating)} {review.rating}점
        </span>
        <button className={styles.delete}>삭제</button>
      </div>

      <div className={styles.tags}>
        <span>#반전</span>
        <span>#감동</span>
      </div>

      <p className={styles.content}>
        {review.content || "내용 모름"}
      </p>

      <span className={styles.date}>2025. 12. 10.</span>
    </div>
  );
}
