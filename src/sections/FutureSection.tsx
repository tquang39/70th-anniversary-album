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
      <p className="eyebrow">TIẾP BƯỚC HÔM NAY, HƯỚNG TỚI NGÀY MAI</p>
      <h2>Xin tri ân những thế hệ đã đặt nền móng<br /><em>và vun đắp cho sự nghiệp giáo dục.</em></h2>
      <p className="future-copy">
        Ký ức được lưu giữ để truyền thống tiếp tục tỏa sáng.
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