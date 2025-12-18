const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const [rows] = await pool.query("SELECT id, name FROM tags ORDER BY id");
console.log("✅ TAGS ROWS:", rows); // 이 줄 추가
res.json(rows);

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
