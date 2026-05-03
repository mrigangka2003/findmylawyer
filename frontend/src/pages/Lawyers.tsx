import { useEffect, useState, useRef, useCallback } from "react";
import useTop from "../hooks/useTop";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MapPin, ChevronRight, Users, Filter, Sparkles, Bot } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

import { useLawyerStore } from "../store/useLawyerStore";

const Lawyers = () => {
    useTop();
    const { speciality } = useParams();
    const lawyers = useLawyerStore((state) => state.lawyers);

    const navigate = useNavigate();
    const location = useLocation();

    const [filterDoc, setFilterDoc] = useState<typeof lawyers>([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>("");
    const [aiQuery, setAiQuery] = useState(location.state?.aiQuery || "");
    const [aiResponse, setAiResponse] = useState<string>("");
    const [isAiLoading, setIsAiLoading] = useState(false);
    const hasTriggeredAiRef = useRef(false);

    const specialities = [
        "Criminal Lawyers",
        "Family Lawyers",
        "Property Lawyers",
        "Civil Lawyers",
        "Corporate Lawyers",
        "Tax Lawyers",
    ];

    const applyFilter = useCallback(() => {
        if (speciality) {
            const filter = speciality.replace(/-/g, " ");
            setFilterDoc(
                lawyers.filter((law) => law.speciality.toLowerCase() === filter)
            );
            setSelectedSpeciality(filter);
        } else {
            setFilterDoc(lawyers);
            setSelectedSpeciality("");
        }
    }, [speciality, lawyers]);

    const handleSpecialityClick = (spec: string) => {
        const urlSpec = spec
            .toLowerCase()
            .replace(/\s+lawyers?$/, "-law")
            .replace(/\s+/g, "-");
        navigate(`/lawyers/${urlSpec}`);
    };

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handleAiSearch = async (queryToSearch = aiQuery) => {
        if (!queryToSearch.trim()) return;
        setIsAiLoading(true);
        setAiResponse("");
        try {
            const { data } = await api.post("/ai/search", { query: queryToSearch });
            setAiResponse(data.response?.choices?.[0]?.message?.content || "No recommendations found.");
        } catch (error) {
            toast.error("AI search failed.");
            console.log(error)
        } finally {
            setIsAiLoading(false);
        }
    };

    useEffect(() => {
        if (aiQuery && !hasTriggeredAiRef.current) {
            hasTriggeredAiRef.current = true;
            handleAiSearch(aiQuery);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 px-6 py-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Legal{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                            Specialists
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Browse through our curated network of experienced legal
                        professionals
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* AI Search Section */}
                <div className="mb-10 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Bot size={100} /></div>
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="text-indigo-400" size={20} /> Ask AI to find a lawyer
                    </h2>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            placeholder="Describe your legal issue (e.g., 'I need someone for a property dispute in Mumbai')"
                            className="flex-1 bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button 
                            onClick={() => handleAiSearch(aiQuery)}
                            disabled={isAiLoading}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                        >
                            {isAiLoading ? "Thinking..." : "Search"}
                        </button>
                    </div>
                    {aiResponse && (
                        <div className="mt-6 bg-black/40 border border-zinc-700/50 rounded-xl p-4 text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">
                            <strong className="text-white block mb-2">AI Recommendations:</strong>
                            {aiResponse}
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-80 shrink-0">
                        <div className="sticky top-8">
                            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <Filter className="w-5 h-5 text-gray-400" />
                                    <h2 className="text-xl font-semibold text-white">
                                        Specializations
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => navigate("/lawyers")}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                                            !selectedSpeciality
                                                ? "bg-white text-black shadow-lg"
                                                : "text-gray-300 hover:bg-zinc-700/50 hover:text-white"
                                        }`}
                                    >
                                        All Lawyers
                                    </button>

                                    {specialities.map((spec, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleSpecialityClick(spec)
                                            }
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                                                selectedSpeciality.toLowerCase() ===
                                                spec.toLowerCase()
                                                    ? "bg-white text-black shadow-lg"
                                                    : "text-gray-300 hover:bg-zinc-700/50 hover:text-white"
                                            }`}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lawyers Grid */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    {selectedSpeciality || "All Lawyers"}
                                </h3>
                                <p className="text-gray-400 mt-1">
                                    {filterDoc.length} lawyer
                                    {filterDoc.length !== 1 ? "s" : ""} found
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filterDoc.map((item, index) => (
                                <div
                                    onClick={() =>
                                        navigate(`/appointment/${item._id}`)
                                    }
                                    key={index}
                                    className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:border-white/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10"
                                >
                                    {/* Background Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                                            <span className="text-green-400 text-xs font-medium">
                                                Available
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative p-6 space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-white text-lg group-hover:text-white transition-colors duration-300">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm font-medium mt-1">
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
                                                <span>
                                                    {item.address.line1}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Experience Badge */}
                                        <div className="flex items-center justify-between">
                                            <div className="bg-zinc-700/50 rounded-full px-3 py-1.5">
                                                <span className="text-xs font-medium text-gray-300">
                                                    {item.experience}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    View Profile
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filterDoc.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center">
                                    <Users className="w-12 h-12 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No lawyers found
                                </h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Try adjusting your search criteria or browse
                                    all available lawyers.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lawyers;
