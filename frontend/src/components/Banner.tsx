import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import LadyOfJustice from "../data/images/lady_justice_removebg.png";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-black px-6 py-24 lg:px-8">
        <div className="relative mx-auto flex max-w-7xl overflow-hidden border border-white/15 bg-white px-7 text-black sm:px-10 lg:px-14">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.06)_100%)]" />
            <div className="relative z-10 flex-1 py-12 sm:py-16 lg:py-20">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Ready when you are</p>
                <div className="max-w-2xl font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
                    <p>Less searching.</p>
                    <p className="text-zinc-600">More useful counsel.</p>
                </div>
                <p className="mt-6 max-w-md text-sm leading-6 text-zinc-600">
                    Create an account to keep your shortlisted lawyers, book consultations, and manage every appointment in one place.
                </p>
                <button
                    className="group mt-8 inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    onClick={() => {
                        navigate("/login");
                        window.scrollTo(0, 0);
                    }}
                >
                    Create an account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
            <div className="relative hidden min-h-[370px] md:block md:w-[40%] lg:w-[390px]">
                <img
                    className="absolute bottom-0 right-0 h-full max-w-md object-contain grayscale contrast-125"
                    src={LadyOfJustice}
                    alt="Lady Justice statue"
                />
            </div>
        </div>
        </section>
    );
};

export default Banner;
