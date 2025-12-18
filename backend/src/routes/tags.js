const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(`${API_BASE}/tags`);

    if (!response.ok) {
      return res.status(response.status).json([]);
    }

    const data = await response.json();
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (e) {
    return res.status(200).json([]); 
  }
}
