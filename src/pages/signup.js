import Header from "../components/Header";
import styles from "@/styles/Auth.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>회원가입</h1>

          <label className={styles.label}>사용자 이름</label>
          <input
            className={styles.input}
            name="name"
            placeholder="사용자 이름을 입력하세요"
            onChange={onChange}
          />

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
            placeholder="비밀번호를 입력하세요 (최소 6자)"
            onChange={onChange}
          />

          <label className={styles.label}>비밀번호 확인</label>
          <input
            className={styles.input}
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={onChange}
          />

          <button className={styles.button}>회원가입</button>

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
