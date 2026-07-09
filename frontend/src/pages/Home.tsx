import Hero from "../components/Hero";
import useTop from "../hooks/useTop";
import SpecialityMenu from "../components/SpecialityMenu";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FAQ from "../components/FAQ";

const Home = () => {
    useTop();
    return (
        <div className="bg-black">
            <Hero/>
            <Features />
            <SpecialityMenu/>
            <Banner/>
            <FAQ />
        </div>
    );
};

export default Home;
