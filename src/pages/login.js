import Header from "../components/Header";
import styles from "@/styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={onChange}
          />

          <label className={styles.label}>비밀번호</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
          />

          <button className={styles.button}>로그인</button>

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
