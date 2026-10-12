import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { PhotoTone } from "../types";
import { MISSING_IMAGE_LABEL } from "../data/notices";

type Props = {
  src: string;
  alt: string;
  tone: PhotoTone;
  label: string;
  variant?: "portrait" | "wide";
  className?: string;
};

export default function PhotoImage({ src, alt, tone, label, variant = "portrait", className }: Props) {
  const [showImage, setShowImage] = useState(Boolean(src));

  return (
    <div className={`photo-frame photo-frame--${variant} tone-${tone}${className ? ` ${className}` : ""}`}>
      <div className="photo-frame-fallback" aria-hidden="true">
        <ImageOff size={18} strokeWidth={1.3} />
        <span className="photo-frame-label">{MISSING_IMAGE_LABEL}</span>
        <span className="photo-frame-year">{label}</span>
      </div>
      {showImage && (
        <img
          className="photo-frame-img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setShowImage(false)}
        />
      )}
    </div>
  );
}