import { useState } from "react";
import { SectionHeading } from "../components/SectionHeading";
import PhotoCard from "../components/PhotoCard";
import PhotoLightbox from "../components/PhotoLightbox";
import { photos } from "../data/photos";
import { SAMPLE_ALBUM_NOTE } from "../data/notices";

export default function AlbumSection() {
  const [selected, setSelected] = useState<typeof photos[number] | null>(null);

  return (
    <section className="album section-shell" id="album" data-reveal>
      <SectionHeading
        eyebrow="KHO TƯ LIỆU"
        title="Mỗi bức ảnh, một câu chuyện."
        description={SAMPLE_ALBUM_NOTE}
        badge="Dữ liệu mẫu"
      />
      <div className="album-grid" role="list">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onSelect={setSelected} />
        ))}
      </div>
      {selected && <PhotoLightbox photo={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}