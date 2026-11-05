// Dải chữ chạy ngang giữa các section — họa tiết áp phích, tôn trọng reduced motion (CSS lo phần còn lại).
const PHRASE = "1956 — Hành trình tri thức — Khoa Toán · Cơ · Tin học — 2026";

export default function MarqueeBand() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        <span className="marquee-group">{PHRASE} — {PHRASE} — {PHRASE} — </span>
        <span className="marquee-group">{PHRASE} — {PHRASE} — {PHRASE} — </span>
      </div>
    </div>
  );
}
