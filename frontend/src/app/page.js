import AboutUs from "@/components/AboutUs";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Trainings from "@/components/Trainings";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection id="hero" />
      <Services id="services" />
      <Trainings id="trainings" />
      <AboutUs id="about" />
      <Feedback id="feedback" />
      <Footer />
    </>
  );
}
