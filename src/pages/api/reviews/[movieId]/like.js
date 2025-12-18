export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { movieId } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${movieId}/like`,
      {
        method: "POST",
        headers: {
          Authorization: req.headers.authorization || "",
        },
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ message: "Like proxy error" });
  }
}
