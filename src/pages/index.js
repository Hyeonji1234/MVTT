import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [heroMovies, setHeroMovies] = useState([]);

    useEffect(() => {
        fetch("/api/tmdb/popular")
            .then((res) => res.json())
            .then(async (data) => {
                const results = data.results || [];
                setMovies(results);

                const trailers = [];

                for (const movie of results) {
                    if (trailers.length >= 5) break;

                    try {
                        const res = await fetch(`/api/video?movieId=${movie.id}`);
                        const video = await res.json();

                        if (video && video.key) {
                            trailers.push({ ...movie, trailerKey: video.key });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }

                setHeroMovies(trailers);
            });
    }, []);

    return (
        <main style={{ background: "#000", color: "#fff" }}>
            <HeroBanner
                movies={heroMovies.length ? heroMovies : movies.slice(0, 5)}
            />

            <section style={section}>
                <h2 style={sectionTitle}>인기 영화</h2>
                <MovieGrid movies={movies} />
            </section>
        </main>
    );
}

const section = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
};

const sectionTitle = {
    fontSize: "22px",
    marginBottom: "20px",
};
