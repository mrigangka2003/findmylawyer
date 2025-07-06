import { Link } from "react-router-dom";
import { specialityData } from "../data/data";

const SpecialityMenu = () => {
    return (
        <div className="w-full px-4 py-10 flex items-center justify-center">
            <div className="max-w-3xl text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4 ">
                    Find By Speciality
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Simply browse through our list of trusted lawyers and
                    schedule your appointments.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {specialityData.map((speciality) => {
                        const formattedName = speciality.specialityName
                            .toLowerCase()
                            .split(/\s+/)[0];

                        return (
                            <Link
                                onClick={() => scrollTo(0, 0)}
                                key={formattedName}
                                to={`/lawyers/${formattedName}`}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition text-sm sm:text-base"
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
