export default async function handler(req, res) {
  const { movieId } = req.query;

  const headers = {
    "Content-Type": "application/json",
  };
  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  try {
    // ✅ 리뷰 목록 조회
    if (req.method === "GET") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}`,
        { headers }
      );
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ✅ 리뷰 수정
    if (req.method === "PUT") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(req.body),
        }
      );
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ✅ 리뷰 삭제
    if (req.method === "DELETE") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}`,
        {
          method: "DELETE",
          headers,
        }
      );
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (e) {
    return res.status(500).json({ message: "Review proxy error" });
  }
}
