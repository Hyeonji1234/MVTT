import Header from "../components/Header";
import styles from "../styles/Auth.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // signup.js 의 handleSignup 함수 부분 수정
const res = await fetch("http://localhost:4000/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: form.username,
    email: form.email,
    password: form.password,
  }),
});

const data = await res.json(); // 백엔드에서 보낸 응답 메시지 가져오기

if (res.ok) {
  alert("회원가입 성공!");
  router.push("/login");
} else {
  // ✅ 단순히 "회원가입 실패"라고 띄우지 말고, 백엔드가 보낸 이유를 띄우세요.
  alert(data.message || "회원가입 실패"); 
};
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
              name="name"
              placeholder="사용자 이름을 입력하세요"
              onChange={handleChange}
            />

            <label className={styles.label}>이메일</label>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              onChange={handleChange}
            />

            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              onChange={handleChange}
            />

            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={styles.input}
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              onChange={handleChange}
            />

            <button className={styles.button}>회원가입</button>
          </form>

          <p className={styles.footerText}>
            이미 계정이 있으신가요?{" "}
            <span className={styles.link} onClick={() => router.push("/login")}>
              로그인
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
