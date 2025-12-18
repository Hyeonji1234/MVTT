import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

export default function Latest() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/api/tmdb/latest")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results); // ✅ 핵심 수정
            });
    }, []);

    return (
        <main style={{ background: "#000", color: "#fff" }}>
            <section
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "40px 20px",
                }}
            >
                <h2 style={{ margin: "0 0 20px 40px" }}>최신 영화</h2>
                <MovieGrid movies={movies} />
            </section>
        </main>
    );
}
