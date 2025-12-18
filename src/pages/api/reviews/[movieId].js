export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { movieId } = req.query;

  try {
    const headers = {};
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}`,
      { headers }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ message: "Reviews GET proxy error" });
  }
}
