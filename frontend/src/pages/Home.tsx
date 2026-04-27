import Hero from "../components/Hero";
import SpecialityMenu from "../components/SpecialityMenu";
import TopLawyers from "../components/TopLawyers";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FAQ from "../components/FAQ";

const Home = () => {
    return (
        <div className="bg-black">
            <Hero/>
            <Features />
            <SpecialityMenu/>
            <TopLawyers/>
            <Banner/>
            <FAQ />
        </div>
    );
};

export default Home;
