import { useRef, useState, useEffect } from "react";
import { Stamp, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP, prefersMotion } from "../lib/gsap";

type TributeCard = {
  id: string;
  author: string;
  cohort: string;
  message: string;
  date: string;
};

const STORAGE_KEY = "mci_70_tribute_cards_v1";

const INITIAL_TRIBUTES: TributeCard[] = [
  {
    id: "seed-1",
    author: "Tập thể Cựu sinh viên K14",
    cohort: "Thế hệ 1969 – 1974",
    message:
      "Từ những giảng đường sơ tán năm xưa đến hôm nay, tình thầy trò và ngọn lửa Toán – Cơ vẫn luôn là hành trang quý giá nhất của chúng tôi.",
    date: "Kỷ niệm 70 năm",
  },
  {
    id: "seed-2",
    author: "Nhóm Cựu sinh viên Toán – Tin K42",
    cohort: "Cựu sinh viên",
    message:
      "Biết ơn các thầy cô đã rèn luyện cho chúng em tư duy mạch lạc, sự kiên trì và niềm đam mê khám phá tri thức không ngừng.",
    date: "Kỷ niệm 70 năm",
  },
  {
    id: "seed-3",
    author: "Chi đoàn Sinh viên K69 – K70",
    cohort: "Sinh viên đang theo học",
    message:
      "Tự hào được viết tiếp chương thứ 70 dưới mái nhà Khoa Toán – Cơ – Tin học. Kính chúc các thầy cô luôn dồi dào sức khỏe!",
    date: "Kỷ niệm 70 năm",
  },
];

function RedSealSvg() {
  return (
    <svg className="tribute-seal-svg" viewBox="0 0 96 96" aria-hidden="true">
      <circle
        cx="48"
        cy="48"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 2"
      />
      <circle cx="48" cy="48" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="48"
        y="30"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="1.2"
      >
        TOÁN · CƠ · TIN HỌC
      </text>
      <text
        x="48"
        y="55"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="24"
        fontWeight="700"
      >
        70 NĂM
      </text>
      <text
        x="48"
        y="71"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontWeight="700"
        letterSpacing="1.6"
      >
        1956 – 2026
      </text>
    </svg>
  );
}

export default function FutureSection() {
  const root = useRef<HTMLElement>(null);
  const previewSealRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<TributeCard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_TRIBUTES;
  });

  const [author, setAuthor] = useState("");
  const [cohort, setCohort] = useState("Cựu sinh viên");
  const [message, setMessage] = useState("");
  const [justStamped, setJustStamped] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {
      // ignore storage errors
    }
  }, [cards]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(prefersMotion, () => {
        const el = root.current;
        if (!el) return;

        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
            defaults: { ease: "power3.out" },
          })
          .from(el.querySelector(".eyebrow"), { autoAlpha: 0, y: 12, duration: 0.45 }, 0)
          .from(
            el.querySelectorAll("h2, .future-copy"),
            { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.55 },
            0.1
          )
          .from(
            el.querySelector(".tribute-workbench"),
            { autoAlpha: 0, y: 26, duration: 0.65 },
            0.25
          );
      });
    },
    { scope: root }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAuthor = author.trim() || "Một người con của Khoa";
    const cleanMsg = message.trim();
    if (!cleanMsg) return;

    const newCard: TributeCard = {
      id: `tribute-${Date.now()}`,
      author: cleanAuthor,
      cohort,
      message: cleanMsg,
      date: "Vừa đóng dấu",
    };

    setCards((prev) => [newCard, ...prev]);
    setJustStamped(true);

    if (previewSealRef.current) {
      gsap.fromTo(
        previewSealRef.current,
        { autoAlpha: 0, scale: 2.3, rotation: -28 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: -12,
          duration: 0.48,
          ease: "back.out(2.2)",
        }
      );
    }

    window.setTimeout(() => {
      const firstCardSeal = root.current?.querySelector(
        ".tribute-wall-card:first-child .tribute-card-seal"
      );
      if (firstCardSeal) {
        gsap.fromTo(
          firstCardSeal,
          { scale: 2.1, autoAlpha: 0, rotation: -25 },
          { scale: 1, autoAlpha: 0.88, rotation: -12, duration: 0.5, ease: "back.out(2)" }
        );
      }
    }, 40);

    setAuthor("");
    setMessage("");
    window.setTimeout(() => setJustStamped(false), 3200);
  };

  return (
    <section ref={root} className="future section-shell" id="future">
      {/* Bản phác họa kiến trúc chìm mờ làm nền cho phần Tri ân cuối trang */}
      <div className="future-bg-sketch" aria-hidden="true">
        <img src="assets/dh-tong-hop-sketch.jpg" alt="" loading="lazy" />
      </div>

      <div className="future-inner">
        <p className="eyebrow">Tiếp bước hôm nay, hướng tới ngày mai</p>
        <h2>
          Xin tri ân những thế hệ đã đặt nền móng và vun đắp cho sự nghiệp giáo dục.
        </h2>
        <p className="future-copy">
          Ký ức được lưu giữ để truyền thống tiếp tục tỏa sáng. Hãy để lại một tấm thiệp lưu bút và đóng dấu kỷ niệm 70 năm của riêng bạn.
        </p>
      </div>

      {/* Bàn Lưu Bút & Đóng Dấu Đỏ Đô 70 Năm */}
      <div className="tribute-workbench">
        <form className="tribute-form-card" onSubmit={handleSubmit}>
          <div className="tribute-form-head">
            <span className="tribute-form-tag">Sổ lưu bút 70 năm</span>
            <h3>Viết thiệp tri ân &amp; Đóng dấu kỷ yếu</h3>
          </div>

          <div className="tribute-fields-row">
            <label className="tribute-field">
              <span>Họ tên hoặc Tập thể</span>
              <input
                type="text"
                name="author"
                placeholder="VD: Nguyễn Văn A – K52 Toán Tin"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={80}
              />
            </label>

            <label className="tribute-field">
              <span>Thế hệ / Vai trò</span>
              <select
                name="cohort"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
              >
                <option value="Cựu sinh viên">Cựu sinh viên</option>
                <option value="Giảng viên & Cán bộ">Giảng viên &amp; Cán bộ</option>
                <option value="Sinh viên & Học viên">Sinh viên &amp; Học viên</option>
                <option value="Bạn hữu & Đối tác">Bạn hữu &amp; Đối tác</option>
              </select>
            </label>
          </div>

          <label className="tribute-field">
            <span>Lời chúc hoặc kỷ niệm dưới mái trường</span>
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Gửi đôi dòng kỷ niệm về thầy cô, bạn bè và những năm tháng tại Khoa Toán – Cơ – Tin học..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={360}
            />
          </label>

          <div className="tribute-form-footer">
            <button type="submit" className="btn btn-primary tribute-submit-btn">
              <Stamp size={17} aria-hidden="true" />
              <span>Đóng dấu Kỷ niệm 70 Năm</span>
            </button>

            {justStamped && (
              <span className="tribute-stamped-feedback" role="status">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>Đã đóng dấu đỏ đô &amp; ghim lên bảng lưu bút!</span>
              </span>
            )}
          </div>

          <div
            ref={previewSealRef}
            className="tribute-preview-seal"
            style={{ opacity: justStamped ? 1 : 0.16 }}
            aria-hidden="true"
          >
            <RedSealSvg />
          </div>
        </form>

        <div className="tribute-wall" aria-label="Bảng thiệp tri ân đã đóng dấu">
          {cards.slice(0, 4).map((card) => (
            <article className="tribute-wall-card" key={card.id}>
              <div className="tribute-wall-meta">
                <strong>{card.author}</strong>
                <span>
                  {card.cohort} · {card.date}
                </span>
              </div>
              <p className="tribute-wall-msg">“{card.message}”</p>
              <div className="tribute-card-seal" aria-hidden="true">
                <RedSealSvg />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
