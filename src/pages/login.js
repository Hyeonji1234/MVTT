import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // ✅ JWT + 유저 정보 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 홈으로 이동
      router.push("/");
    } catch (err) {
      setError("서버 연결 실패");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>로그인</h1>

          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>비밀번호</label>
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "#e50914" }}>{error}</p>}

          <button className={styles.button} onClick={handleLogin}>
            로그인
          </button>

          <div className={styles.footerText}>
            계정이 없으신가요?{" "}
            <span className={styles.link} onClick={() => router.push("/signup")}>
              회원가입
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
