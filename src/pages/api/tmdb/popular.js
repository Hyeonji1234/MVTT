export default async function handler(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const popularRes = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
    );
    const popularData = await popularRes.json();

    const moviesWithTrailer = [];

    for (const movie of popularData.results) {
        const videoRes = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=ko-KR`
        );
        const videoData = await videoRes.json();

        const trailer = videoData.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
        );

        if (trailer) {
            moviesWithTrailer.push({
                ...movie,
                trailerKey: trailer.key,
            });
        } else {
            moviesWithTrailer.push(movie);
        }

        if (moviesWithTrailer.length >= 20) break;
    }

    res.status(200).json(moviesWithTrailer);
}