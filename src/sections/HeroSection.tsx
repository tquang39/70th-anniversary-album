import { useRef } from "react";
import { ArrowDown, ArrowRight, Images } from "lucide-react";
import PhotoSphere from "../components/PhotoSphere";
import SealBadge from "../components/SealBadge";
import { gsap, SplitText, useGSAP, prefersMotion } from "../lib/gsap";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(prefersMotion, () => {
        const el = root.current;
        const heading = el?.querySelector("h1");
        if (!el || !heading) return;

        const split = SplitText.create(heading, { type: "words" });

        const tl = gsap.timeline({ delay: 0.08, defaults: { ease: "power3.out" } });
        tl.from(".hero-badge", { autoAlpha: 0, y: 14, duration: 0.45 }, 0)
          .from(
            split.words,
            { autoAlpha: 0, yPercent: 100, duration: 0.85, ease: "power4.out", stagger: 0.06 },
            0.15
          )
          .from(".hero-subtitle", { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.45")
          .from(".hero-lead", { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.45")
          .from(".hero-cta-group", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.45")
          .from(".scroll-hint", { autoAlpha: 0, duration: 0.45 }, "-=0.3")
          .from(".sphere-stage", { autoAlpha: 0, scale: 0.93, duration: 1.0 }, 0.2);

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-badge">Kỷ niệm 70 năm thành lập (1956 – 2026)</p>
          <h1>
            <span className="gold">70</span> <span className="gold-unit">Năm</span>{" "}
            <span className="hero-title-rest">Hành trình tri thức</span>
          </h1>
          <p className="hero-subtitle">
            Bảy mươi năm – Một dòng chảy tri thức. Tiếp nối truyền thống, kiến tạo tương lai.
          </p>
          <p className="hero-lead">
            Từ những ngày đầu tiên đến hôm nay, mỗi thế hệ thầy và trò đã góp thêm một chương vào câu
            chuyện tri thức của Khoa Toán – Cơ – Tin học.
          </p>
          <div className="hero-cta-group">
            <a className="btn btn-primary" href="#timeline">
              <span>Khám phá Dòng thời gian</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href="#album">
              <Images size={16} aria-hidden="true" />
              <span>Thư viện Ký ức</span>
            </a>
          </div>
          <a className="scroll-hint" href="#story" aria-label="Cuộn xuống phần Câu chuyện">
            <ArrowDown size={15} aria-hidden="true" />
            <span>Cuộn xuống để khám phá</span>
          </a>
        </div>

        <div className="sphere-wrap">
          <div className="sphere-stage">
            <div
              className="sphere-canvas"
              role="region"
              aria-label="Quả cầu 59 thẻ ảnh 3D kỷ niệm 70 năm"
            >
              <PhotoSphere />
            </div>
            <SealBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
