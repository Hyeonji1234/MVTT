import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,        // ✅ 백엔드에서 nickname으로 매핑됨
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "회원가입 실패");
        return;
      }

      // 토큰 저장(원하면 cinema21 방식대로 localStorage/cookie 선택)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/"); // 홈으로
    } catch (err) {
      setError("서버 연결 실패(백엔드 실행 상태 확인)");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>회원가입</div>

          <form onSubmit={handleSignup}>
            <label className={styles.label}>사용자 이름</label>
            <input
              className={styles.input}
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="사용자 이름을 입력하세요"
            />

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
              placeholder="비밀번호를 입력하세요 (최소 6자)"
            />

            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={styles.input}
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={onChange}
              placeholder="비밀번호를 다시 입력하세요"
            />

            {error && <div style={{ color: "#e50914", marginBottom: 12 }}>{error}</div>}

            <button className={styles.button} type="submit">
              회원가입
            </button>
          </form>

          <div className={styles.footerText}>
            이미 계정이 있으신가요?{" "}
            <span className={styles.link} onClick={() => router.push("/login")}>
              로그인
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
