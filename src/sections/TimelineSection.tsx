import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown, Images, X } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { timeline } from "../data/timeline";
import { gsap, ScrollTrigger, useGSAP, prefersMotion } from "../lib/gsap";

const CHAPTER_MOTIFS = [
  {
    numericYear: 1956,
    eraLabel: "Khởi nguồn Toán – Lý",
    formula: "∫∫_Ω (∇²φ + λφ) dS = 0",
    discipline: "Giải tích · Đại số · Hình học",
  },
  {
    numericYear: 1965,
    eraLabel: "Giữ mạch tri thức",
    formula: "ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v",
    discipline: "Cơ học liên tục · Phương trình đạo hàm riêng",
  },
  {
    numericYear: 1987,
    eraLabel: "Hội tụ ba trụ cột",
    formula: " Toán học  ⊕  Cơ học  ⊕  Tin học ",
    discipline: "Định hình Khoa Toán – Cơ – Tin học",
  },
  {
    numericYear: 2000,
    eraLabel: "Hội nhập & Công nghệ",
    formula: "G = (V, E)   |   min f(x) s.t. x ∈ Ω",
    discipline: "Tối ưu hóa · Thuật toán · Hệ thống thông tin",
  },
  {
    numericYear: 2026,
    eraLabel: "Chân trời số & AI",
    formula: "θ* = argmin_θ E[L(f_θ(x), y)]",
    discipline: "Khoa học dữ liệu · Trí tuệ nhân tạo · Toán ứng dụng",
  },
];

function TimelineCard({
  item,
  index,
  isActive,
  defaultExpanded = false,
  onImageClick,
}: {
  item: (typeof timeline)[number];
  index: number;
  isActive: boolean;
  defaultExpanded?: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
    window.setTimeout(() => ScrollTrigger.refresh(), 480);
  };

  const photoCount = item.images?.length ?? 0;
  const motif = CHAPTER_MOTIFS[index] ?? CHAPTER_MOTIFS[0];

  return (
    <article
      className={`timeline-content ${expanded ? "is-expanded" : ""} ${
        isActive ? "is-current" : ""
      }`}
      onClick={handleToggle}
    >
      {/* Họa tiết công thức Toán – Cơ – Tin chìm trong góc thẻ */}
      <span className="timeline-card-formula" aria-hidden="true">
        {motif.formula}
      </span>

      <div className="timeline-card-top">
        <div className="timeline-chapter-inline">
          <span className="timeline-year-inline">{item.year}</span>
          <span className="timeline-chapter-no">Chương {String(index + 1).padStart(2, "0")}</span>
          {item.timeNote && <span className="timeline-note-inline">· {item.timeNote}</span>}
        </div>
        <div className="timeline-card-header">
          <div className="timeline-card-heading">
            <span className="timeline-discipline-tag">{motif.discipline}</span>
            <h3>{item.title}</h3>
            <p className="timeline-summary">{item.description}</p>
          </div>
          <button
            type="button"
            className={`timeline-toggle-btn ${expanded ? "is-open" : ""}`}
            aria-expanded={expanded}
            aria-label={expanded ? `Thu gọn ${item.title}` : `Mở rộng ${item.title}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            <span>{expanded ? "Thu gọn" : "Chi tiết"}</span>
            <ChevronDown size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      {!expanded && photoCount > 0 && (
        <div className="timeline-preview-bar">
          <div className="timeline-preview-thumbs" aria-hidden="true">
            {item.images!.slice(0, 3).map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))}
          </div>
          <span className="timeline-preview-label">
            <Images size={14} aria-hidden="true" />
            {photoCount} ảnh tư liệu trong chương này — nhấn để mở rộng
          </span>
        </div>
      )}

      <div
        className="timeline-detail"
        style={{
          maxHeight: expanded ? "2400px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div className="timeline-detail-inner">
          <p className="timeline-detail-text">{item.detail}</p>
          {item.images && item.images.length > 0 && (
            <div className="timeline-gallery">
              {item.images.map((src, i) => (
                <button
                  type="button"
                  className="timeline-gallery-item"
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick(
                      src,
                      `${item.year} · ${item.title} (Tư liệu ${i + 1}/${item.images!.length})`
                    );
                  }}
                  aria-label={`Phóng to ảnh tư liệu ${i + 1} của chương ${item.year}`}
                >
                  <img src={src} alt={`Tư liệu ${item.year} - ảnh ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ImageLightbox({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption: string;
  onClose: () => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  useGSAP(
    () => {
      gsap.from(overlay.current, { autoAlpha: 0, duration: 0.22 });
      gsap.from(".lightbox-polaroid", {
        autoAlpha: 0,
        y: 22,
        scale: 0.96,
        duration: 0.35,
        ease: "power3.out",
      });
    },
    { scope: overlay }
  );

  return (
    <div
      ref={overlay}
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
        <X size={24} />
      </button>
      <div className="lightbox-polaroid" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-frame">
          <img src={src} alt={caption} />
        </div>
        <p className="lightbox-caption">{caption}</p>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const root = useRef<HTMLElement>(null);
  const yearCounterRef = useRef<HTMLSpanElement>(null);
  const yearObjRef = useRef({ val: 1956 });
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(
    null
  );

  const handleJumpToChapter = (idx: number) => {
    setActiveIdx(idx);
    const targetEl = itemRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Khi chương đang đọc thay đổi, nhảy số năm mượt mà kiểu đồng hồ cơ học (Kinetic Counter)
  useEffect(() => {
    const targetYear = CHAPTER_MOTIFS[activeIdx]?.numericYear ?? 1956;
    gsap.to(yearObjRef.current, {
      val: targetYear,
      duration: 0.65,
      ease: "power3.out",
      onUpdate: () => {
        if (yearCounterRef.current) {
          yearCounterRef.current.textContent = String(Math.round(yearObjRef.current.val));
        }
      },
    });
  }, [activeIdx]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const el = root.current;
      if (!el) return;

      const items = Array.from(el.querySelectorAll<HTMLElement>(".timeline-item"));

      // Theo dõi chương đang nằm trong vùng đọc để cập nhật Kinetic Year Counter
      items.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "bottom 45%",
          onEnter: () => setActiveIdx(idx),
          onEnterBack: () => setActiveIdx(idx),
        });
      });

      mm.add(prefersMotion, () => {
        gsap.from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });

        gsap.set(items, { autoAlpha: 0, y: 32 });
        gsap.set(el.querySelectorAll<HTMLElement>(".timeline-dot"), { scale: 0 });

        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: "power3.out",
              overwrite: true,
            });
            batch.forEach((item) => {
              const dot = item.querySelector(".timeline-dot");
              if (dot) {
                gsap.to(dot, {
                  scale: 1,
                  duration: 0.45,
                  ease: "back.out(2)",
                  delay: 0.12,
                  overwrite: true,
                });
              }
            });
          },
        });
      });
    },
    { scope: root }
  );

  const activeMotif = CHAPTER_MOTIFS[activeIdx] ?? CHAPTER_MOTIFS[0];

  return (
    <section ref={root} className="timeline section-shell" id="timeline">
      {/* Đồ họa đường cong Toán – Cơ – Tin chìm phía sau dòng thời gian */}
      <svg
        className="timeline-math-bg"
        viewBox="0 0 1200 900"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="980" cy="240" r="210" stroke="currentColor" strokeDasharray="4 6" />
        <circle cx="980" cy="240" r="145" stroke="currentColor" />
        <path
          d="M 60 780 C 320 620, 480 860, 760 520 C 940 300, 1060 440, 1180 180"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M 60 820 C 360 700, 540 780, 820 460 C 980 280, 1080 340, 1180 120"
          stroke="currentColor"
          strokeDasharray="3 5"
        />
      </svg>

      <SectionHeading
        eyebrow="Biên niên sử 1956 – 2026"
        title="Thời gian trôi qua. Tri thức ở lại."
        description="Những cột mốc quan trọng đã định hình sự phát triển của Khoa qua bảy thập kỷ — cuộn dọc hoặc bấm chọn mốc năm trên đồng hồ lịch sử bên trái để chuyển nhanh giữa các chương."
      />

      <div className="timeline-workspace">
        {/* Đồng hồ Năm Động Học (Kinetic Year Counter) bám dính khi cuộn + nút chọn nhanh chương */}
        <aside className="timeline-kinetic-box" aria-label="Đồng hồ lịch sử và chọn chương">
          <div className="timeline-kinetic-top">
            <span className="timeline-kinetic-step">
              Chương {String(activeIdx + 1).padStart(2, "0")} / 0{timeline.length}
            </span>
            <span className="timeline-kinetic-era">{activeMotif.eraLabel}</span>
          </div>
          <div className="timeline-kinetic-numeral" aria-live="polite">
            <span ref={yearCounterRef}>1956</span>
          </div>
          <div className="timeline-kinetic-formula">{activeMotif.formula}</div>

          <div className="timeline-kinetic-nav" role="tablist" aria-label="Chọn mốc thời gian">
            {CHAPTER_MOTIFS.map((m, idx) => (
              <button
                key={m.numericYear}
                type="button"
                role="tab"
                aria-selected={activeIdx === idx}
                className={`timeline-kinetic-pill ${activeIdx === idx ? "is-active" : ""}`}
                onClick={() => handleJumpToChapter(idx)}
              >
                <span className="timeline-kinetic-pill-year">{m.numericYear}</span>
                <span className="timeline-kinetic-pill-label">{m.eraLabel}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="timeline-track-wrap">
          <ol className="timeline-list">
            <span className="timeline-line" aria-hidden="true" />
            {timeline.map((item, index) => (
              <li
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`timeline-item ${activeIdx === index ? "is-active" : ""}`}
                key={item.year}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <TimelineCard
                  item={item}
                  index={index}
                  isActive={activeIdx === index}
                  defaultExpanded={index === 0}
                  onImageClick={(src, caption) => setSelectedImage({ src, caption })}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
      {selectedImage && (
        <ImageLightbox
          src={selectedImage.src}
          caption={selectedImage.caption}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
