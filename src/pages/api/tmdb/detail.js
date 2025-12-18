const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "movie id required" });
  }

  try {
    // 1️⃣ TMDB 호출
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`
    );
    const data = await response.json();

    // 2️⃣ backend에 영화 저장 요청 ⭐⭐⭐
    if (data?.id && data?.title) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
        }),
      });
    }

    // 3️⃣ 프론트에 응답
    res.status(200).json(data);
  } catch (err) {
    console.error("TMDB DETAIL ERROR:", err);
    res.status(500).json({ error: "TMDB fetch failed" });
  }
}

