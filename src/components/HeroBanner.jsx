'use client';

import { useEffect, useState } from 'react';

export default function HeroBanner({ movies }) {
  const [index, setIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(null);

  const movie = movies?.[index];

  // 슬라이드
  useEffect(() => {
    if (!movies?.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [movies]);

  // 예고편
  useEffect(() => {
    if (!movie) return;

    setVideoKey(null);
    fetch(`/api/tmdb/videos?movieId=${movie.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.key) setVideoKey(data.key);
      });
  }, [movie]);

  if (!movie) return null;

  const bg = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <section style={wrap}>
      {/* 항상 보이는 배경 */}
      <div
        style={{
          ...background,
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* 영상 */}
      {videoKey && (
        <iframe
          key={movie.id}
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
          style={video}
          allow="autoplay; fullscreen"
        />
      )}

      <div style={overlay} />

      <div style={content}>
        <h1>{movie.title}</h1>
        <p>{movie.overview?.slice(0, 120)}...</p>
        <div>
          <span style={{ color: '#e50914' }}>★</span>{' '}
          {movie.vote_average.toFixed(1)} ·{' '}
          {movie.release_date?.slice(0, 4)}
        </div>
      </div>
    </section>
  );
}

const wrap = {
  position: 'relative',
  height: '420px',
  overflow: 'hidden',
};

const background = {
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const video = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 'none',
};

const overlay = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(to right, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0))',
};

const content = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  height: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: '#fff',
};
