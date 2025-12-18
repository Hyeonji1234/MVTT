import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import styles from "./ReviewSection.module.css";

export default function ReviewSection({ movieId }) {
  const [refresh, setRefresh] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <section className={styles.wrapper}>
      <div className={styles.reviewBox}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            리뷰 <span>({count})</span>
          </h2>
        </div>

        <div className={styles.writeCard}>
          <ReviewForm movieId={movieId} onSuccess={() => setRefresh((v) => v + 1)} />
        </div>

        <ReviewList
          movieId={movieId}
          refresh={refresh}
          onCountChange={(n) => setCount(n)}
          onRefresh={() => setRefresh((v) => v + 1)}
        />
      </div>
    </section>
  );
}
