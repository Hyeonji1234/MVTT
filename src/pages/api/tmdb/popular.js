export default async function handler(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "TMDB_API_KEY is missing" });
    }

    const page = req.query.page ?? "1";
    const language = req.query.language ?? "ko-KR";

    const url = new URL("https://api.themoviedb.org/3/movie/popular");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("language", language);
    url.searchParams.set("page", page);

    const r = await fetch(url.toString());
    const data = await r.json();

    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: String(e) });
  }
}
