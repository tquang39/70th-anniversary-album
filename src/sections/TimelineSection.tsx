import { Clock } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import PhotoImage from "../components/PhotoImage";
import { timeline } from "../data/timeline";
import { SAMPLE_TIMELINE_NOTE } from "../data/notices";

export default function TimelineSection() {
  return (
    <section className="timeline section-shell" id="timeline" data-reveal>
      <SectionHeading
        eyebrow="DÒNG THỜI GIAN"
        title="Thời gian trôi qua. Tri thức ở lại."
        description={SAMPLE_TIMELINE_NOTE}
        badge="Dữ liệu mẫu"
      />
      <ol className="timeline-list">
        {timeline.map((item, index) => (
          <li className="timeline-item" key={item.year} data-reveal>
            <div className="timeline-marker">
              <span className="timeline-chapter">CHƯƠNG {String(index + 1).padStart(2, "0")}</span>
              <span className="timeline-year">{item.year}</span>
            </div>
            <span className="timeline-dot" aria-hidden="true" />
            <article className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.timeNote && (
                <p className="timeline-note">
                  <Clock size={13} strokeWidth={1.6} aria-hidden="true" />
                  <span>{item.timeNote}</span>
                </p>
              )}
              {(item.image || item.imageSource) && (
                <figure className="timeline-photo">
                  <PhotoImage
                    src={item.image ?? ""}
                    alt={item.imageSource ? "Ảnh tư liệu minh họa" : ""}
                    tone={item.tone ?? "blue"}
                    label={item.imageSource ?? "Ảnh tư liệu"}
                  />
                  {item.imageSource && (
                    <figcaption className="photo-caption">{item.imageSource}</figcaption>
                  )}
                </figure>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}