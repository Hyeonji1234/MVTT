const TAGS = ["결말", "반전", "죽음", "빌런정체", "쿠키영상", "OST", "연출"];

export default function SpoilerFilterBar({ selectedTag, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
      {TAGS.map(tag => (
        <button
          key={tag}
          onClick={() => onSelect(prev => (prev === tag ? null : tag))}
          style={{
            padding: "6px 12px",
            borderRadius: 14,
            border: "1px solid #444",
            background: selectedTag === tag ? "#e50914" : "transparent",
            color: selectedTag === tag ? "#fff" : "#aaa",
            cursor: "pointer",
          }}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
