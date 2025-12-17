import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/MovieDetail.module.css";
import Header from "../../components/Header";

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
                const list = Array.isArray(data) ? data : [];
                const trailers = list
                    .filter(v => v.site === "YouTube")
                    .slice(0, 5);
                setVideos(trailers);
            });
    }, [id]);

    if (!movie) return null;

    return (
        <>
            <Head>
                <title>{movie.title}</title>
            </Head>

            {/* 공통 헤더 */}
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
                                <span className={styles.star}>
                                    ★ {movie.vote_average.toFixed(1)}
                                </span>
                                <span>{movie.release_date}</span>
                                <span>{movie.runtime}분</span>
                            </div>

                            <div className={styles.genres}>
                                {movie.genres?.map(g => (
                                    <span key={g.id} className={styles.genre}>
                                        {g.name}
                                    </span>
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
                            {/* 트레일러 선택 탭 */}
                            <div className={styles.trailerTabs}>
                                {videos.map((v, i) => (
                                    <button
                                        key={v.id}
                                        className={`${styles.trailerTab} ${i === activeIndex ? styles.active : ""
                                            }`}
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        {i + 1} {v.name}
                                    </button>
                                ))}
                            </div>

                            {/* 🎬 자동 재생 트레일러 */}
                            <iframe
                                key={videos[activeIndex].key}
                                className={styles.trailerFrame}
                                src={`https://www.youtube.com/embed/${videos[activeIndex].key}?autoplay=1&mute=1&rel=0`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </>
                    ) : (
                        <p className={styles.empty}>
                            예고편이 제공되지 않습니다.
                        </p>
                    )}
                </section>
            </div>
        </>
    );
}
