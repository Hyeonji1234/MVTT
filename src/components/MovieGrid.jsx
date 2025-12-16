export default function MovieGrid({ movies }) {
  return (
    <div style={grid}>
      {movies.map((m) => (
        <div key={m.id} style={card}>
          {/* 포스터 */}
          <div style={posterWrap}>
            <img
              src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
              alt={m.title}
              style={poster}
            />
          </div>

          {/* 정보 */}
          <div style={info}>
            <div style={title}>{m.title}</div>

            <div style={meta}>
              <span>
                <span style={star}>★</span>
                {m.vote_average.toFixed(1)}
              </span>
              <span style={year}>{m.release_date?.slice(0, 4)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 180px)",
  gap: "18px",
};

const card = {
  background: "#111",
  borderRadius: "12px",
  overflow: "hidden",

  /* 🔥 핵심 */
  display: "flex",
  flexDirection: "column",
  height: "360px", // 카드 전체 높이 고정
};

const posterWrap = {
  width: "180px",
  height: "270px",
  flexShrink: 0,
};

const poster = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const info = {
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1, // 🔥 아래 영역 차지
};

const title = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",

  /* 🔥 제목 2줄 제한 */
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const meta = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  marginTop: "auto", // 🔥 항상 아래로
};

const star = {
  color: "#e50914",
  marginRight: "4px",
};

const year = {
  opacity: 0.7,
};
