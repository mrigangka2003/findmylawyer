import { useNavigate } from "react-router-dom";

import { useLawyerStore } from "../store/useLawyerStore";

export default function TopLawyers() {

    const lawyers = useLawyerStore((state)=>state.lawyers)
    const navigate = useNavigate();

    return (
        <div id="topLaw" className="flex flex-col justify-center items-center gap-4 md:mx-10 mx-auto">
            <h1 className="text-3xl font-semibold">Top Lawyers</h1>
            <p className="sm:w-1/3 text-center text-sm text-gray-300">
                Get Expert Legal Guidance from Our Handpicked Network of Trusted
                Lawyers. Browse Now and Find Your Ideal Match!
            </p>

            <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {lawyers.slice(0, 10).map((item, index) => (
                    <div
                        onClick={()=>navigate(`/appointment/${item._id}`)}
                        key={index}
                        className="border border-gray-200 shadow-md rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white"
                    >
                        <img
                            className="w-full h-40 object-cover"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-green-600 mb-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>Available</span>
                            </div>
                            <p className="font-semibold text-gray-800">
                                {item.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {item.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={()=>{navigate('/lawyers'); scrollTo(0,0)}} className="px-6 py-2 bg-white text-black font-medium rounded hover:bg-zinc-200 transition my-2">
                More
            </button>
        </div>
    );
}
