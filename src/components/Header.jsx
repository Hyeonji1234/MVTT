import Link from "next/link";

export default function Header() {
  return (
    <header style={header}>
      <div style={inner}>
        {/* 로고 */}
        <Link href="/" style={logo}>
          SPO
        </Link>

        {/* 메뉴 */}
        <nav style={nav}>
          <Link href="/" style={menu}>영화</Link>
          <Link href="/" style={menu}>인기영화</Link>
          <Link href="/spoiler" style={menuHot}>🔥 실시간 스포일러</Link>
        </nav>

        {/* 인증 */}
        <div style={auth}>
          <Link href="/login" style={login}>로그인</Link>
          <Link href="/signup" style={signup}>회원가입</Link>
        </div>
      </div>
    </header>
  );
}

const header = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  background: "linear-gradient(180deg, #000, #111)",
  borderBottom: "1px solid #222",
};

const inner = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logo = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#e50914",
  textDecoration: "none",
};

const nav = {
  display: "flex",
  gap: "20px",
};

const menu = {
  color: "#ddd",
  textDecoration: "none",
  fontSize: "15px",
};

const menuHot = {
  color: "#ffcc00",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
};

const auth = {
  display: "flex",
  gap: "10px",
};

const login = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

const signup = {
  color: "#fff",
  background: "#e50914",
  padding: "6px 12px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
};
