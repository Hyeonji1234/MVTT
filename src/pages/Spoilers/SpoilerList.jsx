import SpoilerCard from "./SpoilerCard";

export default function SpoilerList({ spoilers }) {
  if (!spoilers.length) {
    return <div style={{ color: "#aaa" }}>스포일러가 없습니다.</div>;
  }

  return (
    <div>
      {spoilers.map(r => (
        <SpoilerCard key={r.id} review={r} />
      ))}
    </div>
  );
}
