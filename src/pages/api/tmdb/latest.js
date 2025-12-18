import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/now_playing`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: 'ko-KR',
          page: 1
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('최신 영화 API 오류:', error);
    res.status(500).json({ message: '최신 영화 불러오기 실패' });
  }
}
