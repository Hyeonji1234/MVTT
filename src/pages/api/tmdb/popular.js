export default async function handler(req, res) {
    try {
        const apiKey = process.env.TMDB_API_KEY;

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
        );
        const data = await response.json();

        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
}
