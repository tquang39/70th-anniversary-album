import { ArrowRight, BookOpen, Image } from "lucide-react";

export default function FutureSection() {
  return (
    <section className="future section-shell" id="future" data-reveal>
      <div className="future-visual" aria-hidden="true">
        <div className="future-ring" />
        <div className="future-ring" />
        <div className="future-ring" />
        <div className="future-core" />
      </div>
      <p className="eyebrow">70 NĂM — VÀ CÒN TIẾP NỮA</p>
      <h2>Gìn giữ ký ức.<br /><em>Kiến tạo tương lai.</em></h2>
      <p className="future-copy">
        Hành trình này được viết tiếp bởi những con người đang học tập, nghiên cứu
        và khám phá hôm nay.
      </p>
      <div className="future-links">
        <a href="#timeline">
          <BookOpen size={18} aria-hidden="true" />
          <span>Khám phá dòng thời gian</span>
          <ArrowRight size={15} aria-hidden="true" />
        </a>
        <a href="#album">
          <Image size={18} aria-hidden="true" />
          <span>Xem album ảnh</span>
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}