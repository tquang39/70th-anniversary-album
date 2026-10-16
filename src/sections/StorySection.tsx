import { ArrowRight } from "lucide-react";

export default function StorySection() {
  return (
    <section className="story section-shell" id="story" data-reveal>
      <div className="story-inner">
        <p className="eyebrow">BẢY MƯƠI NĂM, MỘT HÀNH TRÌNH</p>
        <h2>Có những hành trình được đo bằng năm tháng,<br /><em>có những giá trị được gìn giữ qua nhiều thế hệ.</em></h2>
        <p className="section-lead">
          Với Khoa Toán – Cơ – Tin học, hành trình ấy được viết nên từ tri thức, sự tận tâm của các thế hệ thầy cô và nỗ lực bền bỉ của sinh viên. Bảy mươi năm không chỉ là cột mốc nhìn lại, mà là điểm nối giữa ký ức và khát vọng, giữa những thành tựu đã có và chân trời đang mở ra.
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