export default function MovieGrid({ movies = [] }) {
  return (
    <div style={grid}>
      {movies.map((m) => (
        <div key={m.id} style={card}>
          <div style={posterWrap}>
            <img
              src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
              alt={m.title}
              style={poster}
            />
          </div>

          <div style={info}>
            <div style={title}>{m.title}</div>

            <div style={meta}>
              <span style={rating}>★ {m.vote_average.toFixed(1)}</span>
              <span style={year}>{m.release_date?.slice(0, 4)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= 스타일 ================= */

const grid = {
  display: "grid", 
  gridTemplateColumns: "repeat(6, 1fr)", // ✅ 한 줄에 6개
  gap: "20px",
};

const card = {
  background: "#111",
  borderRadius: "12px",
  overflow: "hidden",
};

const posterWrap = {
  width: "100%",
  aspectRatio: "2 / 3",
};

const poster = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const info = {
  padding: "10px",
};

const title = {
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "6px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const meta = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
};

const rating = {
  color: "#e50914",
  fontWeight: 600,
};

const year = {
  opacity: 0.7,
};
