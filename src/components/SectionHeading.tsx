import { useRef } from "react";
import type { FC } from "react";
import { gsap, SplitText, useGSAP, prefersMotion } from "../lib/gsap";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  badge?: string;
};

export const SectionHeading: FC<Props> = ({ eyebrow, title, description, badge }) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(prefersMotion, () => {
      const el = root.current;
      const heading = el?.querySelector("h2");
      if (!el || !heading) return;

      // autoSplit: tách lại khi font tải xong / resize để không lệch dòng.
      SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const lead = el.querySelector(".section-lead");
          return gsap
            .timeline({
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            })
            .from(el.querySelector(".section-heading-top"), { autoAlpha: 0, y: 14, duration: 0.5 }, 0)
            .from(self.lines, { yPercent: 115, duration: 0.85, ease: "power4.out", stagger: 0.1 }, 0.05)
            .from(lead, { autoAlpha: 0, y: 14, duration: 0.55 }, "-=0.45");
        },
      });
    });
  }, { scope: root });

  return (
    <div ref={root} className="section-heading">
      <div className="section-heading-top">
        <p className="eyebrow">{eyebrow}</p>
        {badge && <span className="section-badge">{badge}</span>}
      </div>
      <h2>{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  );
};
