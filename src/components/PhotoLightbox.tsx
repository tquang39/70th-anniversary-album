import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import PhotoImage from "./PhotoImage";
import type { PhotoItem } from "../types";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

type Props = { photo: PhotoItem; onClose: () => void };

export default function PhotoLightbox({ photo, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  useEscapeKey(true, onClose);
  useBodyScrollLock(true);

  useEffect(() => {
    previousActive.current = document.activeElement as HTMLElement | null;
    const focusTarget = panelRef.current?.querySelector<HTMLButtonElement>("button.lightbox-close");
    focusTarget?.focus();
    return () => {
      previousActive.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panelRef.current?.addEventListener("keydown", handleTab);
    return () => panelRef.current?.removeEventListener("keydown", handleTab);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) onClose();
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={handleBackdropClick}
    >
      <div ref={panelRef} className="lightbox-panel">
        <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
          <X size={22} strokeWidth={1.8} />
        </button>
        <div className="lightbox-frame">
          <PhotoImage
            src={photo.image}
            alt={photo.title}
            tone={photo.tone}
            label={photo.year}
            variant="wide"
          />
        </div>
        <div className="lightbox-body">
          <p className="eyebrow">{photo.period} · {photo.year}</p>
          <h2 id="lightbox-title">{photo.title}</h2>
          <p>{photo.description}</p>
          <dl className="lightbox-meta">
            <dt>Nguồn tư liệu</dt>
            <dd>{photo.source}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}