import { useState, useEffect, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { timeline } from "../data/timeline";

function TimelineCard({ item, index, onImageClick }: { item: typeof timeline[number]; index: number; onImageClick: (src: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`timeline-content cursor-pointer ${expanded ? "timeline-expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <span className="timeline-chapter-mobile">CHƯƠNG {String(index + 1).padStart(2, "0")} &nbsp; {item.year}</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <span className={`timeline-chevron ${expanded ? "rotated" : ""}`} aria-hidden="true">
          <ChevronDown size={20} />
        </span>
      </div>

      <div className="timeline-detail" style={{ maxHeight: expanded ? "2000px" : "0px", opacity: expanded ? 1 : 0 }}>
        <p className="timeline-detail-text">{item.detail}</p>
        {item.images && item.images.length > 0 && (
          <div className="timeline-gallery">
            {item.images.map((src, i) => (
              <div
                className="timeline-gallery-item"
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(src);
                }}
              >
                <img src={src} alt={`Ảnh ${index + 1}-${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>

      {item.timeNote && (
        <p className="timeline-note">
          <span>{item.timeNote}</span>
        </p>
      )}
    </article>
  );
}

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
        <X size={28} />
      </button>
      <img
        src={src}
        alt=""
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function TimelineSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="timeline section-shell" id="timeline" data-reveal>
      <SectionHeading
        eyebrow="DÒNG THỜI GIAN"
        title="Thời gian trôi qua. Tri thức ở lại."
        description="Những cột mốc quan trọng đã định hình sự phát triển của Khoa qua hơn bảy thập kỷ."
      />
      <ol className="timeline-list">
        {timeline.map((item, index) => (
          <li className="timeline-item" key={item.year} data-reveal>
            <span className="timeline-dot" aria-hidden="true" />
            <TimelineCard item={item} index={index} onImageClick={setSelectedImage} />
          </li>
        ))}
      </ol>
      {selectedImage && (
        <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
}
