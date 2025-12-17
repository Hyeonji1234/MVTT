import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("이메일/비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message || "로그인 실패");
        return;
      }

      // 토큰 저장(일단 localStorage)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/movie"); // 필요하면 홈으로 바꿔도 됨
    } catch (err) {
      setMsg("서버 연결 실패(백엔드 실행 상태 확인)");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>로그인</h1>

          <form onSubmit={handleLogin}>
            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={onChange}
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={onChange}
            />

            {msg && (
              <div style={{ color: "#ff5a5a", fontSize: 13, marginBottom: 12 }}>
                {msg}
              </div>
            )}

            <button className={styles.button} type="submit">
              로그인
            </button>

            <div className={styles.footerText}>
              계정이 없으신가요?{" "}
              <span className={styles.link} onClick={() => router.push("/signup")}>
                회원가입
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
