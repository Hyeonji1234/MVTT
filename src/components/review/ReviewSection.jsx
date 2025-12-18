import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import styles from "./ReviewSection.module.css";

export default function ReviewSection({ movieId }) {
  const [refresh, setRefresh] = useState(0);
  const [count, setCount] = useState(0);

  // 🔹 탭 필터
  const FILTERS = [
    { key: "all", label: "전체" },
    { key: "spoiler", label: "스포일러" },
    { key: "normal", label: "일반" },
  ];
  const [filter, setFilter] = useState("all");

  // 🔹 스포일러 태그 옵션 (UI용)
  const TAG_OPTIONS = [
    "결말",
    "반전",
    "죽음",
    "빌런정체",
    "쿠키영상",
    "엔딩",
    "OST",
    "연출",
  ];

  // 🔹 선택된 태그
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.reviewBox}>
        {/* 헤더 */}
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            리뷰 <span>({count})</span>
          </h2>
        </div>

        {/* 리뷰 작성 */}
        <div className={styles.writeCard}>
          <ReviewForm
            movieId={movieId}
            onSuccess={() => setRefresh((v) => v + 1)}
          />
        </div>

        {/* 필터 탭 */}
        <div className={styles.filterTabs}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.tab} ${
                filter === f.key ? styles.active : ""
              }`}
              onClick={() => {
                setFilter(f.key);
                setSelectedTag(null); // 탭 변경 시 태그 초기화
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 🔥 스포일러 태그 필터 */}
        {filter === "spoiler" && (
          <div className={styles.tagFilter}>
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                className={`${styles.tagBtn} ${
                  selectedTag === tag ? styles.activeTag : ""
                }`}
                onClick={() =>
                  setSelectedTag((prev) => (prev === tag ? null : tag))
                }
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* 리뷰 리스트 */}
        <ReviewList
          movieId={movieId}
          refresh={refresh}
          filter={filter}
          selectedTag={selectedTag}
          onTagClick={(tag) => {
            setFilter("spoiler");
            setSelectedTag(tag);
          }}
          onCountChange={(n) => setCount(n)}
          onRefresh={() => setRefresh((v) => v + 1)}
        />
      </div>
    </section>
  );
}
