import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import styles from "./ReviewSection.module.css";

export default function ReviewSection({ movieId }) {
  const [refresh, setRefresh] = useState(0);
  const [count, setCount] = useState(0);   // ⭐ 추가

  return (
    <section className={styles.outer}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h2>
            리뷰 <span>({count})</span>
          </h2>
        </div>

        <ReviewForm
          movieId={movieId}
          onSuccess={() => setRefresh(v => v + 1)}
        />

        <ReviewList
          movieId={movieId}
          refresh={refresh}
          onCountChange={setCount}   // ⭐ 내려줌
        />
      </div>
    </section>
  );
}
