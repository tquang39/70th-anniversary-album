import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEscapeKey(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 880) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useBodyScrollLock(menuOpen);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="Khoa Toán – Cơ – Tin học — về trang chủ">
        <span className="brand-mark" aria-hidden="true">70</span>
        <span className="brand-copy">
          <strong>Khoa Toán – Cơ – Tin học</strong>
          <small>Kỷ niệm 70 năm</small>
        </span>
      </a>

      <nav id="primary-nav" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Điều hướng chính">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link${activeId === item.href.replace("#", "") ? " is-active" : ""}`}
            aria-current={activeId === item.href.replace("#", "") ? "true" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}