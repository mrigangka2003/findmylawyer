import { Link } from "react-router-dom";
import { specialityData } from "../data/data";

const SpecialityMenu = () => {
    return (
        <div className="w-full px-4 py-16 flex items-center justify-center bg-black border-t border-white/5">
            <div className="max-w-3xl text-center">
                <h3 className="text-3xl sm:text-4xl font-display font-semibold mb-4 text-white">
                    Find By Speciality
                </h3>
                <p className="text-gray-400 mb-8 text-sm sm:text-base">
                    Simply browse through our list of trusted lawyers and
                    schedule your appointments.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {specialityData.map((speciality) => {
                        const formattedName = speciality.specialityName
                            .toLowerCase() 
                            .split(/\s+/) 
                            .join('-');   

                        return (
                            <Link
                                onClick={() => scrollTo(0, 0)}
                                key={formattedName}
                                to={`/lawyers/${formattedName}`}
                                className="bg-zinc-900 hover:bg-white hover:text-black border border-white/10 text-gray-300 px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium"
                            >
                                {speciality.specialityName}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SpecialityMenu;
