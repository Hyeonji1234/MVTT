import pool from "../../../../backend/src/db.js";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "영화 ID 없음" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko-KR`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "영화 상세 정보 조회 실패" });
  }
}
