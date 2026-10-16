import { ArrowDown, ArrowRight } from "lucide-react";
import PhotoSphere from "../components/PhotoSphere";

export default function HeroSection() {
  return (
    <section className="hero" id="home" data-reveal>
      <div className="hero-copy">
        <p className="hero-badge"><span className="hero-badge-dot" aria-hidden="true"></span>70 NăM KỶ NIỆM</p>
        <h1><span className="gold">70</span> <span className="gold-unit">NĂM</span> — HÀNH TRÌNH TRI THỨC</h1>
        <p className="hero-subtitle">Bảy mươi năm – Một dòng chảy tri thức. Tiếp nối truyền thống, kiến tạo tương lai.</p>
        <p className="hero-lead">
          Từ những ngày đầu tiên đến hôm nay, mỗi thế hệ đã góp thêm một chương
          vào câu chuyện tri thức của Khoa Toán – Cơ – Tin học.
        </p>
        <div className="hero-cta-group">
          <a className="btn btn-gold" href="#story">
            Khám phá Lịch sử
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <a className="scroll-hint" href="#story" aria-label="Cuộn xuống phần Câu chuyện">
          <ArrowDown size={15} aria-hidden="true" />
          <span>Cuộn xuống để khám phá</span>
        </a>
      </div>

      <div className="sphere-wrap">
        <div className="sphere-canvas" role="img" aria-label="Quả cầu ảnh ký niệm 70 năm">
          <PhotoSphere />
        </div>
        <p className="sphere-caption">Kéo để xoay · Cuộn chuột để phóng to / thu nhỏ</p>
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>01</span>
        <i />
        <span>MỘT HÀNH TRÌNH</span>
      </div>
    </section>
  );
}