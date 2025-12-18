import styles from "../../pages/Spoilers/SpoilerPage.module.css";

import Link from "next/link";

export default function SpoilerCard({ review }) {
  return (
    <div
      className={`${styles.card} ${
        review?.isNew ? styles.highlight : ""
      }`}
    >
      {/* 🎬 영화 제목 */}
      <Link
        href={`/movie/${review.movie_id}`}
        className={styles.movieLink}
      >
        <div className={styles.movieTitle}>
          {review.movie_title}
        </div>
      </Link> 

      {/* 작성자 + 날짜 */}
      <div className={styles.meta}>
        {review.username} · {review.created_at?.slice(0, 16)}
      </div>

      {/* 스포일러 태그 */}
      {review.tags?.length > 0 && (
        <div className={styles.tagRow}>
          {review.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 내용 */}
      <div className={styles.content}>
        {review.content}
      </div>
    </div>
  );
}
