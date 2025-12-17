import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import ReviewSection from "../../components/review/ReviewSection";
import styles from "../../styles/MovieDetail.module.css";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    // 영화 상세
    fetch(`/api/tmdb/detail?id=${id}`)
      .then(res => res.json())
      .then(setMovie);

    // 예고편
    fetch(`/api/tmdb/videos?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const trailers = Array.isArray(data)
          ? data.filter(v => v.site === "YouTube").slice(0, 5)
          : [];
        setVideos(trailers);
      });
  }, [id]);

  if (!movie) return null;

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>

      <Header />

      <div className={styles.page}>
        {/* BACKDROP */}
        <div
          className={styles.backdrop}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />

        {/* MOVIE INFO */}
        <div className={styles.container}>
          <div className={styles.header}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
            />

            <div className={styles.info}>
              <h1 className={styles.title}>{movie.title}</h1>

              <div className={styles.meta}>
                <span className={styles.star}>★ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date}</span>
                <span>{movie.runtime}분</span>
              </div>

              <div className={styles.genres}>
                {movie.genres?.map(g => (
                  <span key={g.id} className={styles.genre}>{g.name}</span>
                ))}
              </div>

              <h3 className={styles.subtitle}>줄거리</h3>
              <p className={styles.overview}>{movie.overview}</p>
            </div>
          </div>
        </div>

        {/* TRAILER */}
        <section className={styles.trailerSection}>
          <h2 className={styles.sectionTitle}>예고편</h2>

          {videos.length > 0 ? (
            <>
              <div className={styles.trailerTabs}>
                {videos.map((v, i) => (
                  <button
                    key={v.id}
                    className={`${styles.trailerTab} ${i === activeIndex ? styles.active : ""}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {i + 1}. {v.name}
                  </button>
                ))}
              </div>

              <iframe
                key={videos[activeIndex].key}
                className={styles.trailerFrame}
                src={`https://www.youtube.com/embed/${videos[activeIndex].key}?autoplay=1&mute=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </>
          ) : (
            <p className={styles.empty}>예고편이 없습니다.</p>
          )}
        </section>

        {/* ⭐ REVIEW SECTION */}
        <ReviewSection movieId={movie.id} />
      </div>
    </>
  );
}
