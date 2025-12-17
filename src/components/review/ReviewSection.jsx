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
    <h2 className={styles.title}>리뷰 ({count})</h2>

    <ReviewForm
      movieId={movieId}
      onSuccess={() => setRefresh(v => v + 1)}
    />

    <ReviewList
      movieId={movieId}
      refresh={refresh}
      onCountChange={setCount}
    />
  </div>
</section>

  );
}