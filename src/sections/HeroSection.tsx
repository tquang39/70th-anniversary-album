import { ArrowDown, ArrowRight } from "lucide-react";
import PhotoSphere from "../components/PhotoSphere";

export default function HeroSection() {
  return (
    <section className="hero" id="home" data-reveal>
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true"></span>Kỷ niệm 70 năm · Hành trình tri thức</p>
        <h1><span>70 năm</span><br /><em>Hành trình</em><br />tri thức</h1>
        <p className="hero-lead">
          Từ những ngày đầu tiên đến hôm nay, mỗi thế hệ đã góp thêm một chương
          vào câu chuyện tri thức của Khoa Toán – Cơ – Tin học.
        </p>
        <a className="btn btn-primary" href="#story">
          Bắt đầu hành trình
          <ArrowRight size={17} aria-hidden="true" />
        </a>
        <a className="scroll-hint" href="#story" aria-label="Cuộn xuống phần Câu chuyện">
          <ArrowDown size={15} aria-hidden="true" />
          <span>Cuộn xuống để khám phá</span>
        </a>
      </div>

      <div className="sphere-wrap">
        <div className="sphere-canvas" role="img" aria-label="Quả cầu ảnh ký niệm 70 năm — mô hình minh họa">
          <PhotoSphere />
        </div>
        <p className="sphere-caption">Kéo để xoay · Cuộn chuột để phóng to / thu nhỏ</p>
        <p className="sphere-note">Mô hình minh họa — ảnh tư liệu sẽ được gắn sau khi có dữ liệu</p>
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>01</span>
        <i />
        <span>MỘT HÀNH TRÌNH</span>
      </div>
    </section>
  );
}