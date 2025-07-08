import { useNavigate } from "react-router-dom";
import { useLawyerStore } from "../store/useLawyerStore";
import { MapPin, ChevronRight, Users, Award } from "lucide-react";

export default function TopLawyers() {
    const lawyers = useLawyerStore((state) => state.lawyers);
    const navigate = useNavigate();

    return (
        <div id="topLaw" className="flex flex-col justify-center items-center gap-8 md:mx-10 py-16">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-blue-400 text-sm font-medium mb-2">
                    <Award className="w-4 h-4" />
                    <span>PREMIUM NETWORK</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Top Lawyers
                </h1>
                <p className="sm:w-2/3 max-w-2xl mx-auto text-center text-gray-400 leading-relaxed">
                    Get Expert Legal Guidance from Our Handpicked Network of Trusted
                    Lawyers. Browse Now and Find Your Ideal Match!
                </p>
            </div>

            {/* Lawyers Grid */}
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 px-4">
                {lawyers.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        key={index}
                        className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                            <img
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                src={item.image}
                                alt={item.name}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            {/* Status Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2.5 py-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-green-400 text-xs font-medium">Available</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative p-5 space-y-3">
                            <div>
                                <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <p className="text-blue-400 text-sm font-medium">
                                    {item.speciality}
                                </p>
                            </div>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>150+ cases</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{item.address.line1}</span>
                                </div>
                            </div>
                            
                            {/* Experience Badge */}
                            <div className="flex items-center justify-between">
                                <div className="bg-zinc-700/50 rounded-full px-3 py-1">
                                    <span className="text-xs font-medium text-gray-300">
                                        {item.experience}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/lawyers');
                    scrollTo(0, 0);
                }}
                className="group relative px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 flex items-center gap-2 border border-gray-200"
            >
                <span>View All Lawyers</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-white rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </button>
        </div>
    );
}