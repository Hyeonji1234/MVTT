import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.nickname || !form.email || !form.password || !form.password2) {
      setMsg("모든 항목을 입력해주세요.");
      return;
    }
    if (form.password.length < 6) {
      setMsg("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    if (form.password !== form.password2) {
      setMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username,
    email,
    password,
  }),
});


      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message || "회원가입 실패");
        return;
      }

      // 성공 -> 로그인 페이지로
      router.push("/login");
    } catch (err) {
      setMsg("서버 연결 실패(백엔드 실행 상태 확인)");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>회원가입</h1>

          <form onSubmit={handleSignup}>
            <label className={styles.label}>사용자 이름</label>
            <input
              className={styles.input}
              name="nickname"
              placeholder="사용자 이름을 입력하세요"
              value={form.nickname}
              onChange={onChange}
            />

            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={onChange}
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              value={form.password}
              onChange={onChange}
            />

            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={styles.input}
              name="password2"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.password2}
              onChange={onChange}
            />

            {msg && (
              <div style={{ color: "#ff5a5a", fontSize: 13, marginBottom: 12 }}>
                {msg}
              </div>
            )}

            <button className={styles.button} type="submit">
              회원가입
            </button>

            <div className={styles.footerText}>
              이미 계정이 있으신가요?{" "}
              <span className={styles.link} onClick={() => router.push("/login")}>
                로그인
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
