"use client";

import { useEffect, useState } from "react";

export default function HeroBanner({ movies }) {
  const [index, setIndex] = useState(0);
  const movie = movies[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  // 🎬 자동 슬라이드 (예고편 기준 약 12초)
  useEffect(() => {
    const timer = setTimeout(next, 12000);
    return () => clearTimeout(timer);
  }, [index]);

  if (!movie) return null;

  return (
    <section style={wrapper}>
      {/* 🎥 예고편 or 이미지 */}
      {movie.trailerKey ? (
        <iframe
          key={movie.trailerKey}
          src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={video}
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          style={video}
        />
      )}

      {/* 어두운 그라데이션 */}
      <div style={overlay} />

      {/* 🎬 영화 정보 */}
      <div style={content}>
        <h1 style={title}>{movie.title}</h1>
        <p style={overview}>{movie.overview}</p>
        <div style={meta}>
          <span style={rating}>★ {movie.vote_average.toFixed(1)}</span>
          <span style={year}>{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>

      {/* ⬅ ➡ 화살표 (아이콘만) */}
      <button style={{ ...arrow, left: 24 }} onClick={prev}>‹</button>
      <button style={{ ...arrow, right: 24 }} onClick={next}>›</button>

      {/* 인디케이터 */}
      <div style={dots}>
        {movies.map((_, i) => (
          <span
            key={i}
            style={{
              ...dot,
              opacity: i === index ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ================= 스타일 ================= */

const wrapper = {
  position: "relative",
  height: "520px",
  background: "#000",
  overflow: "hidden",
};

const video = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  border: "none",
  objectFit: "cover",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.1) 100%)",
};

const content = {
  position: "absolute",
  left: "60px",
  bottom: "90px",
  maxWidth: "480px",
  color: "#fff",
  zIndex: 2,
};

const title = {
  fontSize: "38px",
  fontWeight: 800,
  marginBottom: "14px",
};

const overview = {
  fontSize: "14px",
  lineHeight: 1.6,
  opacity: 0.9,
  marginBottom: "16px",
};

const meta = {
  display: "flex",
  gap: "10px",
};

const rating = {
  background: "#e50914",
  padding: "6px 10px",
  borderRadius: "6px",
  fontWeight: 700,
  fontSize: "13px",
};

const year = {
  background: "#222",
  padding: "6px 10px",
  borderRadius: "6px",
  fontSize: "13px",
};

const arrow = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "48px",
  cursor: "pointer",
  zIndex: 3,
};

const dots = {
  position: "absolute",
  bottom: "20px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  zIndex: 3,
};

const dot = {
  width: "26px",
  height: "3px",
  background: "#e50914",
};
