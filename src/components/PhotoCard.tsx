import { ArrowUpRight } from "lucide-react";
import PhotoImage from "./PhotoImage";
import type { PhotoItem } from "../types";

type Props = { photo: PhotoItem; onSelect: (photo: PhotoItem) => void };

export default function PhotoCard({ photo, onSelect }: Props) {
  return (
    <button
      type="button"
      className="photo-card"
      onClick={() => onSelect(photo)}
      data-reveal
      aria-label={`Xem ảnh ${photo.title}`}
    >
      <span className="photo-card-overlay" aria-hidden="true">
        <ArrowUpRight size={17} strokeWidth={1.6} />
      </span>
      <PhotoImage
        src={photo.thumbnail}
        alt=""
        tone={photo.tone}
        label={photo.year}
      />
      <div className="photo-meta">
        <span className="photo-period">{photo.period}</span>
        <div className="photo-title-row">
          <h3>{photo.title}</h3>
          <span className="photo-year">{photo.year}</span>
        </div>
      </div>
    </button>
  );
}