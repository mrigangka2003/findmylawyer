import { useNavigate } from "react-router-dom";

import LadyOfJustice from "../data/images/lady_justice-removebg.png";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="flex bg-white rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-40 text-black">
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
                    <p>Book Appointment</p>
                    <p className="mt-4">With 100+ Trusted Lawyers</p>
                </div>
                <button
                    className="bg-black text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all text-white"
                    onClick={() => {
                        navigate("/login");
                        scrollTo(0, 0);
                    }}
                >
                    Create Account
                </button>
            </div>
            <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
                <img
                    className="w-full absolute bottom-0 right-0 max-w-md"
                    src={LadyOfJustice}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Banner;
