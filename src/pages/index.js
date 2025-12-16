import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/api/tmdb/popular")
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));
    }, []);

    return (
        <main style={{ background: "#000", color: "#fff" }}>
            {/* 🔥 여기 중요 */}
            <HeroBanner movies={movies.slice(0, 5)} />

            <section style={section}>
                <h2 style={sectionTitle}>인기 영화</h2>
                <MovieGrid movies={movies.slice(5)} />
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
