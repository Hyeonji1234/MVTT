export default async function handler(req, res) {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: "TMDB_API_KEY is missing" });
        }

        const page = req.query.page || 1;
        const language = req.query.language || "ko-KR";

        const url = new URL("https://api.themoviedb.org/3/movie/popular");
        url.searchParams.set("api_key", apiKey);
        url.searchParams.set("language", language);
        url.searchParams.set("page", page);

        const response = await fetch(url.toString());
        const data = await response.json();

        return res.status(200).json({
            page: data.page,
            results: data.results,
            total_pages: data.total_pages,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch popular movies",
            error: String(err),
        });
    }
}