import Link from "next/link";

export default function MovieGrid({ movies }) {
  return (
    <div style={wrapper}>
      <div style={grid}>
        {movies.map((m) => (
          // 🔑 카드 하나당 relative wrapper 추가
          <div key={m.id} style={{ position: "relative" }}>
            
            {/* 🔒 기존 카드 구조 그대로 */}
            <div style={card}>
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
                  <span style={rating}>★ {(m?.vote_average ?? 0).toFixed(1)}</span>
                  <span style={year}>{m.release_date?.slice(0, 4)}</span>
                </div>
              </div>
            </div>

            {/* ✅ UI 안 바꾸는 투명 Link */}
            <Link
              href={`/movie/${m.id}`}
              aria-label={`${m.title} 상세 페이지 이동`}
              style={linkLayer}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= 스타일 ================= */

/* ================= 레이아웃 ================= */

const wrapper = {
  width: "100%",
  padding: "0 40px", // 좌우 여백
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)", // 한 줄 6개 고정
  gap: "20px",
};

/* ================= 카드 ================= */

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

/* ================= 카드 정보 ================= */

const info = {
  padding: "10px",
  height: "70px", 
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", 
  boxSizing: "border-box",
};

const title = {
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "4px",
  display: "-webkit-box",
  WebkitLineClamp: "1", 
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  
  lineHeight: "1.4",
  height: "1.4em",
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
/* 🔥 새로 추가된 스타일 (UI 영향 없음) */
const linkLayer = {
  position: "absolute",
  inset: 0,
  zIndex: 10,
};
