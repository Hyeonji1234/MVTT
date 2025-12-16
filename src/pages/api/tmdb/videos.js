export default async function handler(req, res) {
    try {
        const { movieId } = req.query;
        const apiKey = process.env.TMDB_API_KEY;

        // 🔥 language 제거 (중요)
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.results) {
            return res.status(200).json(null);
        }

        // YouTube Trailer 우선
        const trailer =
            data.results.find(
                (v) =>
                    v.site === "YouTube" &&
                    v.type === "Trailer"
            ) ||
            data.results.find(
                (v) =>
                    v.site === "YouTube" &&
                    v.type === "Teaser"
            );

        res.status(200).json(trailer || null);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch video" });
    }
}
