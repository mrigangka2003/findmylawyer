import Hero from "../components/Hero";
import SpecialityMenu from "../components/SpecialityMenu";
import TopLawyers from "../components/TopLawyers";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Hero/>
            <SpecialityMenu/>
            <TopLawyers/>
            <Banner/>
        </div>
    );
};

export default Home;
