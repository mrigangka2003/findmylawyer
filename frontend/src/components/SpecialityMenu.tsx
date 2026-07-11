import { Link } from "react-router-dom";
import { specialityData } from "../data/data";

const SpecialityMenu = () => {
    return (
        <section className="border-y border-white/10 bg-[#0d0d0d] px-6 py-24 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                <div>
                    <p className="eyebrow mb-4">Explore by area</p>
                    <h3 className="max-w-md font-display text-4xl leading-none text-white sm:text-5xl">
                        Start where your matter begins.
                    </h3>
                    <p className="mt-6 max-w-sm text-sm leading-6 text-zinc-500">
                        Browse a practice area directly, or let the matching flow help you identify one.
                    </p>
                </div>

                <div className="grid border-l border-t border-white/10 sm:grid-cols-2">
                    {specialityData.map((speciality) => {
                        const formattedName = speciality.specialityName
                            .toLowerCase() 
                            .split(/\s+/) 
                            .join('-');   

                        return (
                            <Link
                                onClick={() => window.scrollTo(0, 0)}
                                key={formattedName}
                                to={`/lawyers/${formattedName}`}
                                className="group flex min-h-24 items-center justify-between border-b border-r border-white/10 px-5 py-5 text-sm font-medium text-zinc-300 transition hover:bg-white hover:text-black"
                            >
                                <span>{speciality.specialityName}</span>
                                <span className="text-lg text-zinc-600 transition group-hover:translate-x-1 group-hover:text-black">↗</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SpecialityMenu;
