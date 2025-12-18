import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, [router.pathname]); // 🔥 핵심: 경로 변경 시 재실행

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
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
          <Link href="/spoilers">실시간 스포일러</Link>
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
