// Con dấu tri ân kiểu tem kỷ niệm — chữ chạy trên vòng tròn, quay chậm (CSS reduced-motion tắt).
export default function SealBadge() {
  return (
    <svg className="hero-seal" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path
          id="seal-circle"
          d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          fill="none"
        />
      </defs>
      <circle cx="60" cy="60" r="59" className="seal-ring" />
      <circle cx="60" cy="60" r="53" className="seal-ring seal-ring-thin" />
      <circle cx="60" cy="60" r="31" className="seal-ring" />
      <text className="seal-text">
        <textPath href="#seal-circle" startOffset="0">
          KHOA TOÁN – CƠ – TIN HỌC ✦ KỶ NIỆM 70 NĂM ✦ 1956–2026 ✦
        </textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" className="seal-numeral">70</text>
      <text x="60" y="72" textAnchor="middle" className="seal-sub">NĂM</text>
    </svg>
  );
}
