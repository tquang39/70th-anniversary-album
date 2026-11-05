import { ArrowUp } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src="assets/logo-a70.png" alt="Logo 70 năm" />
          <div className="footer-brand-text">
            <strong>Khoa Toán – Cơ – Tin học</strong>
            <small>Kỷ niệm 70 năm thành lập (1956 – 2026)</small>
          </div>
        </div>

        <a className="footer-top" href="#home" aria-label="Về đầu trang">
          <span>Về đầu trang</span>
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
