import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/tmdb/popular")
      .then((res) => res.json())
      .then((data) => {
        setHeroMovies(data.slice(0,5));
        setMovies(data);
      });
  }, []);

  return (
    <main style={{ background: "#000", color: "#fff" }}>
      {heroMovies.length > 0 && <HeroBanner movies={heroMovies} />}

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h2>인기 영화</h2>
        <MovieGrid movies={movies} />
      </section>
    </main>
  );
}
