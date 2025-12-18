import { useEffect, useState } from "react";
import styles from "./ReviewSection.module.css";

export default function ReviewForm({ movieId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tags")
      .then((res) => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  const toggleTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요합니다.");

    await fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: movieId,
        rating,
        content,
        is_spoiler: spoiler,
        tag_ids: spoiler ? selectedTags : [],
      }),
    });

    setContent("");
    setRating(5);
    setSpoiler(false);
    setSelectedTags([]);

    if (typeof onSuccess === "function") onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 별점 라인 */}
      <div className={styles.ratingInner}>
        <span className={styles.ratingText}>별점:</span>

        <select
          className={styles.ratingSelect}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>★★★★★ 5점</option>
          <option value={4}>★★★★☆ 4점</option>
          <option value={3}>★★★☆☆ 3점</option>
          <option value={2}>★★☆☆☆ 2점</option>
          <option value={1}>★☆☆☆☆ 1점</option>
        </select>
      </div>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="영화 리뷰를 작성해주세요..."
      />

      <div className={styles.writeFooter}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
          />
          스포일러 포함
        </label>

        <button type="submit" className={styles.submit}>
          리뷰 작성
        </button>
      </div>

      {/* 스포일러일 때만 태그 */}
      {spoiler && (
        <div className={styles.tagBox}>
          {tags.map((t) => (
            <button
              type="button"
              key={t.id}
              className={`${styles.tag} ${selectedTags.includes(t.id) ? styles.tagActive : ""}`}
              onClick={() => toggleTag(t.id)}
            >
              #{t.name}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
