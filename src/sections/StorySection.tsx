import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersMotion } from "../lib/gsap";

const PILLARS = [
  {
    year: "1956",
    title: "Khởi nguồn truyền thống",
    desc: "Đặt nền móng đào tạo và nghiên cứu từ những lớp giảng dạy Toán – Lý đầu tiên tại mái trường Đại học Tổng hợp Hà Nội.",
  },
  {
    year: "1987",
    title: "Ba trụ cột học thuật",
    desc: "Chính thức định hình tên gọi Khoa Toán – Cơ – Tin học, kết nối nền tảng lý thuyết với khoa học máy tính hiện đại.",
  },
  {
    year: "2026",
    title: "Bảy thập kỷ tiếp nối",
    desc: "Nơi hội tụ các thế hệ nhà giáo, nhà khoa học và sinh viên cùng kiến tạo những chân trời tri thức mới.",
  },
];

export default function StorySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(prefersMotion, () => {
        const el = root.current;
        const heading = el?.querySelector("h2");
        if (!el || !heading) return;

        // Hiệu ứng trôi nhẹ (parallax chìm) cho lớp phác họa nền khi cuộn
        gsap.fromTo(
          el.querySelector(".story-bg-sketch"),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap
              .timeline({
                scrollTrigger: { trigger: el, start: "top 78%", once: true },
              })
              .from(el.querySelector(".eyebrow"), { autoAlpha: 0, y: 12, duration: 0.45 }, 0)
              .from(
                self.lines,
                { yPercent: 110, duration: 0.85, ease: "power4.out", stagger: 0.1 },
                0.08
              )
              .from(
                el.querySelector(".section-lead"),
                { autoAlpha: 0, y: 16, duration: 0.55 },
                "-=0.45"
              )
              .from(
                el.querySelectorAll(".story-pillar"),
                { autoAlpha: 0, y: 22, stagger: 0.1, duration: 0.55 },
                "-=0.3"
              );
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="story section-shell" id="story">
      {/* Lớp phác họa cổng trường Đại học Tổng hợp chìm vào nền giấy ngà */}
      <div className="story-bg-sketch" aria-hidden="true">
        <img src="assets/dh-tong-hop-sketch.jpg" alt="" loading="lazy" />
      </div>

      <div className="story-inner">
        <div className="story-header">
          <p className="eyebrow">Bảy mươi năm, một hành trình</p>
          <h2>
            Có những hành trình được đo bằng năm tháng, có những giá trị được gìn giữ qua nhiều thế hệ.
          </h2>
          <p className="section-lead">
            Với Khoa Toán – Cơ – Tin học, hành trình ấy được viết nên từ tri thức, sự tận tâm của các thế hệ thầy cô và nỗ lực bền bỉ của sinh viên. Bảy mươi năm không chỉ là cột mốc nhìn lại, mà là điểm nối giữa ký ức và khát vọng, giữa những thành tựu đã có và chân trời đang mở ra.
          </p>
        </div>

        <dl className="story-pillars">
          {PILLARS.map((pillar) => (
            <div className="story-pillar" key={pillar.year}>
              <dt className="story-pillar-head">
                <span className="story-pillar-year">{pillar.year}</span>
                <span className="story-pillar-title">{pillar.title}</span>
              </dt>
              <dd className="story-pillar-desc">{pillar.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
