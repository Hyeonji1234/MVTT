import { useEffect, useState } from "react";

export default function SpoilerWarningModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const confirmed = sessionStorage.getItem("spoilerWarningConfirmed");
    if (!confirmed) {
      setOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem("spoilerWarningConfirmed", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginTop: 0 }}>⚠️ 스포일러 주의</h2>
        <p style={{ lineHeight: 1.6 }}>
          본 사이트는 영화 리뷰 특성상<br />
          <strong>스포일러를 포함한 콘텐츠</strong>가 존재합니다.
          <br /><br />
          스포일러에 민감하신 분은<br />
          이용에 주의해 주세요.
        </p>

        <button onClick={handleConfirm} style={button}>
          확인하고 계속 보기
        </button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  background: "#111",
  color: "#fff",
  padding: "32px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "420px",
  textAlign: "center",
};

const button = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#e50914",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "15px",
  cursor: "pointer",
};
