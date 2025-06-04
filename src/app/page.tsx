import Navbar from "./navbar/page";
import HeroSection from "./heroSection/page";
import About from "./about/page";
import Projects from "./projects/page";
import Technologies from "./technologies/page";
import Contact from "./contact/page";
import Footer from "./footer/page";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <About />
      <Projects />
      <Technologies />
      <Contact />
      <Footer />
    </div>
  );
}
