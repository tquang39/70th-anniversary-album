import { ArrowRight } from "lucide-react";

export default function StorySection() {
  return (
    <section className="story section-shell" id="story" data-reveal>
      <div className="story-inner">
        <p className="eyebrow">MỘT DÒNG CHẢY LIÊN TỤC</p>
        <h2>Quá khứ tạo nên hôm nay.<br /><em>Hôm nay mở đường tương lai.</em></h2>
        <p className="section-lead">
          Mỗi bức ảnh là một lát cắt thời gian. Mỗi dấu mốc là một câu chuyện về
          con người, giảng đường và những khám phá được tiếp nối qua nhiều thế hệ.
        </p>
        <ul className="story-links" data-reveal>
          <li>
            <a href="#timeline">Dòng thời gian <ArrowRight size={15} aria-hidden="true" /></a>
          </li>
          <li>
            <a href="#album">Album ảnh <ArrowRight size={15} aria-hidden="true" /></a>
          </li>
          <li>
            <a href="#future">Tương lai <ArrowRight size={15} aria-hidden="true" /></a>
          </li>
        </ul>
      </div>
    </section>
  );
}