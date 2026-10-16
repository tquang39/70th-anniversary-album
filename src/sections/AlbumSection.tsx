import { useState, useEffect, useCallback } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { albumTopics } from "../data/photos";

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
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
        <X size={28} />
      </button>
      <img src={src} alt="" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function AlbumGrid({ images, expanded, onImageClick }: { images: string[]; expanded: boolean; onImageClick: (src: string) => void }) {
  const displayImages = expanded ? images : images.slice(0, 6);
  return (
    <div className="album-topic-grid">
      {displayImages.map((src, i) => (
        <div className="album-topic-item" key={i} onClick={() => onImageClick(src)}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export default function AlbumSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="album section-shell" id="album" data-reveal>
      <SectionHeading
        eyebrow="THƯ VIỆN KÝ ỨC"
        title="Mỗi bức ảnh, một câu chuyện."
        description="Những khoảnh khắc lưu giữ dòng chảy tri thức và thanh xuân qua nhiều thế hệ."
      />
      <div className="album-topics">
        {albumTopics.map((topic) => {
          const isExpanded = expandedTopics[topic.id] ?? false;
          return (
            <div className="album-topic" key={topic.id} data-reveal>
              <div className="album-topic-header">
                <h3>{topic.title}</h3>
                <p>{topic.subtitle}</p>
              </div>
              <AlbumGrid
                images={topic.images}
                expanded={isExpanded}
                onImageClick={setSelectedImage}
              />
              {topic.images.length > 6 && (
                <div className="album-loadmore">
                  <button className="btn-loadmore" onClick={() => toggleTopic(topic.id)}>
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} />
                        <span>Thu gọn</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        <span>Xem thêm ({topic.images.length - 6} ảnh)</span>
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
        <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
}
