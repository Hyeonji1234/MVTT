export default async function handler(req, res) {
  try {
    const { movieId } = req.query;
    const apiKey = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ko-KR`;

    const response = await fetch(url);
    const data = await response.json();

    // YouTube 예고편만 필터
    const trailer = data.results.find(
      (v) =>
        v.site === "YouTube" &&
        (v.type === "Trailer" || v.type === "Teaser")
    );

    res.status(200).json(trailer || null);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
}
