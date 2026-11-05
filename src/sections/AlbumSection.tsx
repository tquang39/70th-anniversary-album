import { useRef, useState, useEffect, useCallback } from "react";
import { X, ChevronDown, ChevronUp, MoveHorizontal } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { albumTopics } from "../data/photos";
import { gsap, ScrollTrigger, useGSAP, prefersMotion } from "../lib/gsap";

const THEN_NOW_PAIRS = [
  {
    id: "thay-tro",
    label: "Thầy & Trò (1956 ⇄ 2026)",
    beforeYear: "1956",
    beforeTitle: "GS. Lê Văn Hợp cùng sinh viên Khoa Toán K1",
    beforeSrc: "assets/album/1/img03.jpg",
    afterYear: "2026",
    afterTitle: "Đội ngũ giảng viên Khoa Toán – Cơ – Tin học hôm nay",
    afterSrc: "assets/album/7/img10.jpg",
  },
  {
    id: "tot-nghiep",
    label: "Mùa Tốt nghiệp (1974 ⇄ 2026)",
    beforeYear: "1974",
    beforeTitle: "Lễ bế giảng Khóa 14 Khoa Toán năm 1974",
    beforeSrc: "assets/album/3/img01.jpg",
    afterYear: "2026",
    afterTitle: "Niềm vui lễ tốt nghiệp của thế hệ sinh viên mới",
    afterSrc: "assets/album/7/img04.jpg",
  },
  {
    id: "the-he",
    label: "Mái trường & Hội ngộ",
    beforeYear: "Thập niên 1960",
    beforeTitle: "Các giáo sư thế hệ đầu tiên của Khoa",
    beforeSrc: "assets/album/1/img08.jpg",
    afterYear: "Hiện đại",
    afterTitle: "Hội nghị khoa học và truyền thống các thế hệ",
    afterSrc: "assets/album/6/img01.jpg",
  },
];

function ThenNowComparison() {
  const [activePairIdx, setActivePairIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const pair = THEN_NOW_PAIRS[activePairIdx];

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(4, Math.min(96, raw)));
  }, []);

  return (
    <div className="then-now-block">
      <div className="then-now-header">
        <div>
          <span className="album-topic-index">Đối chiếu tư liệu lịch sử</span>
          <h3>Lăng kính Xưa &amp; Nay (1956 ⇄ 2026)</h3>
          <p>Kéo thanh trượt ngang để cảm nhận dòng chảy 70 năm giữa hai thế hệ.</p>
        </div>

        <div className="then-now-tabs" role="tablist" aria-label="Chọn cặp ảnh Xưa và Nay">
          {THEN_NOW_PAIRS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activePairIdx === idx}
              className={`then-now-tab ${activePairIdx === idx ? "is-active" : ""}`}
              onClick={() => {
                setActivePairIdx(idx);
                setSliderPos(50);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className="then-now-stage"
        onPointerDown={(e) => {
          draggingRef.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        {/* Lớp dưới: Ảnh NAY (2026) */}
        <div className="then-now-layer then-now-after">
          <img src={pair.afterSrc} alt={pair.afterTitle} draggable={false} />
          <div className="then-now-badge then-now-badge-right">
            <strong>NAY · {pair.afterYear}</strong>
            <span>{pair.afterTitle}</span>
          </div>
        </div>

        {/* Lớp trên cắt theo clip-path: Ảnh XƯA (1956) */}
        <div
          className="then-now-layer then-now-before"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img src={pair.beforeSrc} alt={pair.beforeTitle} draggable={false} />
          <div className="then-now-badge then-now-badge-left">
            <strong>XƯA · {pair.beforeYear}</strong>
            <span>{pair.beforeTitle}</span>
          </div>
        </div>

        {/* Thanh phân cách kéo thả */}
        <div
          className="then-now-divider"
          style={{ left: `${sliderPos}%` }}
          aria-hidden="true"
        >
          <span className="then-now-handle">
            <MoveHorizontal size={18} />
          </span>
        </div>

        {/* Input range ẩn hỗ trợ bàn phím và trình đọc màn hình */}
        <input
          type="range"
          min={4}
          max={96}
          value={Math.round(sliderPos)}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="then-now-range-sr"
          aria-label="Thanh trượt so sánh ảnh Xưa và Nay"
        />
      </div>
    </div>
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

function AlbumGrid({
  images,
  expanded,
  onImageClick,
}: {
  images: { src: string; caption: string }[];
  expanded: boolean;
  onImageClick: (src: string, caption: string) => void;
}) {
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!expanded) return;
      const extras = grid.current?.querySelectorAll<HTMLElement>(
        ".album-topic-item:nth-child(n+9)"
      );
      if (!extras?.length) return;
      gsap.from(extras, {
        autoAlpha: 0,
        y: 16,
        scale: 0.97,
        stagger: 0.04,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    },
    { dependencies: [expanded], scope: grid }
  );

  const displayImages = expanded ? images : images.slice(0, 8);
  return (
    <div ref={grid} className="album-topic-grid">
      {displayImages.map((img, i) => (
        <button
          type="button"
          className="album-topic-item"
          key={i}
          onClick={() => onImageClick(img.src, img.caption)}
          aria-label={img.caption}
        >
          <div className="album-item-frame">
            <img src={img.src} alt={img.caption} loading="lazy" />
          </div>
          <span className="album-item-caption">{img.caption}</span>
        </button>
      ))}
    </div>
  );
}

export default function AlbumSection() {
  const root = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(
    null
  );
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
    window.setTimeout(() => ScrollTrigger.refresh(), 480);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(prefersMotion, () => {
        const el = root.current;
        if (!el) return;

        gsap.from(".then-now-block", {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".then-now-block",
            start: "top 86%",
            once: true,
          },
        });

        const headers = Array.from(el.querySelectorAll<HTMLElement>(".album-topic-header"));
        gsap.set(headers, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(headers, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              overwrite: true,
            }),
        });

        const cells = Array.from(el.querySelectorAll<HTMLElement>(".album-topic-item"));
        gsap.set(cells, { autoAlpha: 0, y: 18 });
        ScrollTrigger.batch(cells, {
          start: "top 92%",
          once: true,
          interval: 0.1,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.45,
              overwrite: true,
            }),
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="album section-shell" id="album">
      <SectionHeading
        eyebrow="Thư viện ký ức"
        title="Mỗi bức ảnh, một câu chuyện."
        description="Những khoảnh khắc lưu giữ dòng chảy tri thức và thanh xuân qua nhiều thế hệ."
      />

      <div className="album-topics">
        {/* Khung kéo đối chiếu Xưa & Nay (1956 ⇄ 2026) */}
        <ThenNowComparison />

        {albumTopics.map((topic, index) => {
          const isExpanded = expandedTopics[topic.id] ?? false;
          return (
            <div className="album-topic" key={topic.id}>
              <div className="album-topic-header">
                <div className="album-topic-title-wrap">
                  <span className="album-topic-index">
                    Bộ sưu tập {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{topic.title}</h3>
                  <p>{topic.subtitle}</p>
                </div>
                <span className="album-topic-count">{topic.images.length} tư liệu ảnh</span>
              </div>
              <AlbumGrid
                images={topic.images}
                expanded={isExpanded}
                onImageClick={(src, caption) => setSelectedImage({ src, caption })}
              />
              {topic.images.length > 8 && (
                <div className="album-loadmore">
                  <button
                    type="button"
                    className="btn-loadmore"
                    onClick={() => toggleTopic(topic.id)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} aria-hidden="true" />
                        <span>Thu gọn bộ sưu tập</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} aria-hidden="true" />
                        <span>Xem thêm {topic.images.length - 8} tư liệu ảnh</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
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
