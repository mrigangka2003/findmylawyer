import Hero from "../components/Hero";
import useTop from "../hooks/useTop";
import SpecialityMenu from "../components/SpecialityMenu";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import TopLawyers from "../components/TopLawyers";

const Home = () => {
    useTop();
    return (
        <div className="bg-black">
            <Hero/>
            <Features />
            <TopLawyers />
            <SpecialityMenu/>
            <Banner/>
            <FAQ />
        </div>
    );
};

export default Home;
