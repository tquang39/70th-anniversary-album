import Header from "./components/Header";
import HeroSection from "./sections/HeroSection";
import MarqueeBand from "./components/MarqueeBand";
import StorySection from "./sections/StorySection";
import TimelineSection from "./sections/TimelineSection";
import AlbumSection from "./sections/AlbumSection";
import FutureSection from "./sections/FutureSection";
import FooterSection from "./sections/FooterSection";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
      <Header />
      <main id="main">
        <HeroSection />
        <MarqueeBand />
        <StorySection />
        <TimelineSection />
        <AlbumSection />
        <FutureSection />
      </main>
      <FooterSection />
    </>
  );
}

export default App;
