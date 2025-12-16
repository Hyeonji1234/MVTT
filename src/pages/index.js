import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function loadPopular(p = 1) {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/tmdb/popular?page=${p}&language=ko-KR`);
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      const data = await res.json();
      setMovies(data.results ?? []);
      setPage(p);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPopular(1);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 8 }}>Movie Review (Test Home)</h1>
      <p style={{ marginTop: 0, opacity: 0.7 }}>
        Vercel 배포 후 외부 접속에서 TMDB 데이터가 뜨는지 검증용
      </p>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button onClick={() => loadPopular(Math.max(1, page - 1))} disabled={loading || page === 1}>
          Prev
        </button>
        <button onClick={() => loadPopular(page + 1)} disabled={loading}>
          Next
        </button>
        <span style={{ alignSelf: "center", opacity: 0.8 }}>page: {page}</span>
      </div>

      {loading && <p>Loading...</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {movies.map((m) => (
          <article
            key={m.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              overflow: "hidden",
              background: "white",
            }}
          >
            <div style={{ aspectRatio: "2 / 3", background: "#f2f2f2" }}>
              {m.poster_path ? (
                <img
                  alt={m.title}
                  src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : null}
            </div>
            <div style={{ padding: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                {m.title}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                평점 {m.vote_average?.toFixed?.(1) ?? m.vote_average} · {m.release_date}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
