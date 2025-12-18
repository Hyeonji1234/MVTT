import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "로그인 실패");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.id);
      
      router.push("/");
    } catch (err) {
      setError("서버 연결 실패(백엔드 실행 상태 확인)");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>로그인</div>

          <form onSubmit={handleLogin}>
            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="이메일을 입력하세요"
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="비밀번호를 입력하세요"
            />

            {error && <div style={{ color: "#e50914", marginBottom: 12 }}>{error}</div>}

            <button className={styles.button} type="submit">
              로그인
            </button>
          </form>

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
