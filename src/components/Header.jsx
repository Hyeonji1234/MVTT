import Link from "next/link";

export default function Header() {
  return (
    <header style={header}>
      <div style={container}>
        {/* 왼쪽: 로고 */}
        <div style={left}>
          <Link href="/" style={logo}>
            SPOI
          </Link>
        </div>

        {/* 가운데: 메뉴 */}
        <nav style={center}>
          <Link href="/" style={menu}>영화</Link>
          <Link href="/latest" style={menu}>최신영화</Link>
          <Link href="/spoiler" style={menu}>
            실시간 스포일러
          </Link>
        </nav>

        {/* 오른쪽: 인증 */}
        <div style={right}>
          <Link href="/login" style={login}>로그인</Link>
          <Link href="/signup" style={signup}>회원가입</Link>
        </div>
      </div>
    </header>
  );
}

const header = {
  width: "100%",
  background: "linear-gradient(180deg, #000 0%, #111 100%)",
  borderBottom: "1px solid #222",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
};

const left = {
  display: "flex",
  alignItems: "center",
};

const center = {
  display: "flex",
  justifyContent: "center",
  gap: "28px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const logo = {
  color: "#e50914",
  fontSize: "22px",
  fontWeight: "800",
  textDecoration: "none",
};

const menu = {
  color: "#e5e5e5",
  textDecoration: "none",
  fontSize: "15px",
};

const menuHot = {
  color: "#ffcc00",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};

const login = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  padding: "6px 12px",
  border: "1px solid #555",
  borderRadius: "6px",
};

const signup = {
  color: "#fff",
  background: "#e50914",
  textDecoration: "none",
  fontSize: "14px",
  padding: "6px 12px",
  borderRadius: "6px",
};
