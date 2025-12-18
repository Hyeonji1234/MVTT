import { useEffect, useState } from "react";
import SpoilerFilterBar from "./SpoilerFilterBar";
import SpoilerList from "./SpoilerList";
import styles from "./SpoilerPage.module.css";

export default function SpoilerPage() {
  const [spoilers, setSpoilers] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  console.log("spoilers:", spoilers);
  console.log(
  spoilers.map(r => ({ id: r.id, isNew: r.isNew }))
);
  console.log(spoilers[0]?.tags);

  // 🔴 실시간 폴링 (30초)
  useEffect(() => {
    const fetchSpoilers = async () => {
      const res = await fetch("http://localhost:4000/reviews/spoilers", {
      cache: "no-store",
      });

      const data = await res.json();

    setSpoilers(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const prevIds = new Set(safePrev.map(r => r.id));

      return (data ?? []).map(r => ({
        ...r,
        isNew: !prevIds.has(r.id),
      }));
    });
      setLastFetchTime(Date.now());
    };

    fetchSpoilers();
    const interval = setInterval(fetchSpoilers, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = spoilers.filter(r => {
    if (!selectedTag) return true;
    return r.tags?.includes(selectedTag);
  });

  return (
    <div style={{ maxWidth: 900, margin: "100px auto" }}>
      <h1 style={{ color: "#fff" }}>실시간 스포일러</h1>

      <SpoilerFilterBar
        selectedTag={selectedTag}
        onSelect={setSelectedTag}
      />

      <SpoilerList spoilers={filtered} />
    </div>
  );
}


