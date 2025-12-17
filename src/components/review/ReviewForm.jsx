import { useState } from "react";
import styles from "./ReviewSection.module.css";

export default function ReviewForm({ movieId, onSuccess }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [spoiler, setSpoiler] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, content, rating, spoiler }),
    });

    setContent("");
    setRating(5);
    setSpoiler(false);
    onSuccess();
  };

  return (
    <div className={styles.formCard}>
      <h3>리뷰 작성</h3>

      <div className={styles.ratingRow}>
  <label className={styles.label}>별점</label>

  <div className={styles.selectWrap}>
    <select
      className={styles.select}
      value={rating}
      onChange={(e) => setRating(+e.target.value)}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <option key={v} value={v}>
          {"★".repeat(v)}
        </option>
      ))}
    </select>

    <span className={styles.chev}>▾</span>
  </div>
</div>

      <textarea
        className={styles.textarea}
        placeholder="영화 리뷰를 작성해주세요..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div className={styles.formFooter}>
        <label>
          <input
            type="checkbox"
            checked={spoiler}
            onChange={e => setSpoiler(e.target.checked)}
          />
          스포일러 포함
        </label>

        <button className={styles.submit} onClick={submit}>
          리뷰 작성
        </button>
      </div>
    </div>
  );
}
