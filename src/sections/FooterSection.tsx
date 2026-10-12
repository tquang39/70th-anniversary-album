import { ArrowUp } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="site-footer" data-reveal>
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">70</span>
        <div>
          <strong>Khoa Toán – Cơ – Tin học</strong>
          <small>Kỷ niệm 70 năm — Hành trình tri thức</small>
        </div>
      </div>

      <p className="footer-message">Gìn giữ ký ức · Tiếp nối tri thức · Vươn tới tương lai</p>

      <div className="footer-logos" aria-label="Vị trí logo (sẽ bổ sung sau)">
        <span className="logo-slot">Logo trường</span>
        <span className="logo-slot">Logo khoa</span>
      </div>

      <a className="footer-top" href="#home" aria-label="Về đầu trang">
        <ArrowUp size={14} aria-hidden="true" />
        Về đầu trang
      </a>

      <p className="footer-note">Bản dựng bộ khung — nội dung và ảnh tư liệu sẽ được cập nhật.</p>
    </footer>
  );
}