"use client";
import { useEffect, useState } from "react";

export default function HeroBanner({ movies }) {
  const [index, setIndex] = useState(0);

  const movie = movies[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [index, movies.length]);

  return (
    <section style={wrapper}>
      <iframe
        src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=1&controls=0`}
        allow="autoplay; encrypted-media"
        style={videoBg}
      />


      <div style={content}>
        <h1 style={title}>{movie.title}</h1>
        <p style={overview}>{movie.overview}</p>
      </div>

      <button style={{ ...arrow, left: 20 }} onClick={() => setIndex((index - 1 + movies.length) % movies.length)}>
        ‹
      </button>
      <button style={{ ...arrow, right: 20 }} onClick={() => setIndex((index + 1) % movies.length)}>
        ›
      </button>

      <div style={dots}>
  	{movies.map((_, i) => (
    	  <span
      	     key={i}
             style={{
        	...dot,
        	background: i === index ? "#e50914" : "#555", // 흰색 / 회색
		opacity: i === index ? 1 : 0.6,
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
  width: "100%",
  height: "600px",        
  background: "#000",
  overflow: "hidden",
};

const videoBg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",   
  border: "none",
  zIndex: 0,
};

const content = {
  position: "absolute",
  left: "40px",
  bottom: "30px",
  maxWidth: "480px",
  color: "#fff",
  zIndex: 2,
};

const title = {
  fontSize: "32px",
  fontWeight: 800,
  marginBottom: "8px",
};

const overview = {
  fontSize: "15px",
  lineHeight: 1.5,
  opacity: 0.85,
  marginBottom: "14px",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
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
};

const year = {
  background: "#222",
  padding: "6px 10px",
  borderRadius: "6px",
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
  cursor: "pointer",
};