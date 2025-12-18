const TMDB_API_KEY = process.env.TMDB_API_KEY;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "영화 ID 없음" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=ko-KR`
    );

    const data = await response.json();

    // YouTube 트레일러만 필터
    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    res.status(200).json(trailer || null);
  } catch (error) {
    res.status(500).json({ message: "트레일러 조회 실패" });
  }
}
