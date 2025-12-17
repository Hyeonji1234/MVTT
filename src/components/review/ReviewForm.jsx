import { useState } from "react";
import styles from "./ReviewSection.module.css";

export default function ReviewForm({ movieId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  const submit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요합니다.");

    await fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId,
        rating,
        content,
        spoiler,
      }),
    });

    setContent("");
    setRating(5);
    setSpoiler(false);
    onSuccess();
  };

  return (
    <div className={styles.writeCard}>
      <div className={styles.ratingBox}>
<div className={styles.ratingWrapper}>
  <span className={styles.ratingText}>별점: </span>

  <select
    className={styles.ratingSelect}
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
  >
    <option value={5}>★★★★★</option>
    <option value={4}>★★★★☆</option>
    <option value={3}>★★★☆☆</option>
    <option value={2}>★★☆☆☆</option>
    <option value={1}>★☆☆☆☆</option>
  </select>
</div>

</div>


      <textarea
        className={styles.textarea}
        placeholder="리뷰를 작성하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div className={styles.writeFooter}>
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
