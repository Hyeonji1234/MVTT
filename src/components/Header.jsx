import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.href = "/";
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link href="/">SPO</Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/">영화</Link>
          <Link href="/latest">최신영화</Link>
          <Link href="/spoiler">실시간 스포일러</Link>
        </nav>

        <div className={styles.auth}>
          {user ? (
            <>
              <span className={styles.nickname}>{user.nickname}</span>
              <button className={styles.logout} onClick={logout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.login}>
                로그인
              </Link>
              <Link href="/signup" className={styles.signup}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
