export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ message: "Reviews POST proxy error" });
  }
}
