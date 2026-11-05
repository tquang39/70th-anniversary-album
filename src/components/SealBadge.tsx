// Con dấu tri ân kiểu tem kỷ niệm — chữ chạy trên vòng tròn, quay chậm (CSS reduced-motion tắt).
export default function SealBadge() {
  return (
    <svg className="hero-seal" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path
          id="seal-circle"
          d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          fill="none"
        />
      </defs>
      {/* Viền ngoài cùng & vạch chia độ đồng hồ cổ */}
      <circle cx="60" cy="60" r="58.5" className="seal-ring" />
      <circle cx="60" cy="60" r="55" className="seal-ring seal-ring-ticks" />
      <circle cx="60" cy="60" r="51.5" className="seal-ring seal-ring-thin" />

      {/* Vòng chữ chạy quanh tâm */}
      <text className="seal-text">
        <textPath href="#seal-circle" startOffset="0">
          KHOA TOÁN – CƠ – TIN HỌC ✦ KỶ NIỆM 70 NĂM ✦ 1956–2026 ✦
        </textPath>
      </text>

      {/* Tâm con dấu kỷ niệm */}
      <circle cx="60" cy="60" r="34" className="seal-ring seal-ring-inner" />
      <circle cx="60" cy="60" r="30.5" className="seal-ring seal-ring-dashed" />

      <text x="60" y="57" textAnchor="middle" className="seal-numeral">
        70
      </text>
      <text x="60" y="70" textAnchor="middle" className="seal-sub">
        NĂM
      </text>
      <text x="60" y="79" textAnchor="middle" className="seal-years">
        1956 – 2026
      </text>
    </svg>
  );
}
