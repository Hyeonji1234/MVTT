export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const headers = {};
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tags`,
      { headers }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ message: "Tags proxy error" });
  }
}
