const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
    const { id } = req.query;   // ✅ id로 통일

    if (!id) {
        return res.status(400).json({ message: "영화 ID 없음" });
    }

    try {
        // 🔥 language 제거 (트레일러 누락 방지)
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`
        );

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return res.status(200).json([]);
        }

        // ✅ YouTube Trailer / Teaser 여러 개 반환
        const videos = data.results.filter(
            (v) =>
                v.site === "YouTube" &&
                (v.type === "Trailer" || v.type === "Teaser")
        );

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "트레일러 조회 실패" });
    }
}
