import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0); // 🔥 삭제 후 갱신용

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:4000/reviews/${movieId}`
        );
        const data = await res.json();

        setReviews(data);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, refresh]); // 🔥 refresh 변경 시 재요청

  if (loading) {
    return <p style={{ color: "#999" }}>리뷰 불러오는 중...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p style={{ color: "#777", textAlign: "center" }}>
        아직 작성된 리뷰가 없습니다.
      </p>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={() => setRefresh((v) => v + 1)} 
        />
      ))}
    </>
  );
}
