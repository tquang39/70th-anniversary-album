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
      if (window.innerWidth > 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useBodyScrollLock(menuOpen);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label="Khoa Toán – Cơ – Tin học — về trang chủ">
        <img className="brand-logo" src="/assets/logo-a70.png" alt="Logo 70 năm" />
        <span className="brand-divider" aria-hidden="true"></span>
        <span className="brand-name">Khoa Toán - Cơ - Tin học</span>
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