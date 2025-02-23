import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import Trainings from '../components/Trainings';
import AboutUs from '../components/AboutUs';
import Feedback from '../components/Feedback';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
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
};

export default Home;
