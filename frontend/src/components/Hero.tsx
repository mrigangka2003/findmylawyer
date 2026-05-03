import { useNavigate } from "react-router-dom";
import { ArrowRight, Terminal, Cpu, Search, Activity } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-white/30">
            {/* Logic Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
                
                {/* AI Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-400 text-xs font-mono mb-8 animate-fade-in">
                    <Cpu className="w-3 h-3 text-white" />
                    <span className="tracking-widest uppercase">Neural Intelligence v2.1 Activated</span>
                </div>

                {/* Refined Typography */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 max-w-4xl">
                    Legal Intelligence <br/>
                    <span className="text-gray-500 italic font-light">Redefined.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                    Our AI scans thousands of case outcomes to match you with the precise legal expertise required for your jurisdiction. High-stakes law meets machine precision.
                </p>

                {/* Smart Input Action */}
                <div className="w-full max-w-2xl relative group animate-fade-in-up">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-zinc-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative flex items-center bg-black border border-white/10 rounded-xl p-2 pl-6">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") navigate(`/lawyers`, { state: { aiQuery: query } });
                            }}
                            placeholder="Briefly describe your legal situation..." 
                            className="bg-transparent border-none outline-none flex-1 px-4 text-white placeholder:text-gray-600 focus:ring-0"
                        />
                        <button 
                            onClick={() => navigate(`/lawyers`, { state: { aiQuery: query } })}
                            className="bg-white text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            Analyze Case
                        </button>
                    </div>
                </div>

                {/* Technical Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 w-full max-w-4xl border-y border-white/5 py-10">
                    {[
                        { label: "Data Points", val: "2.4M+", icon: Activity },
                        { label: "Accuracy", val: "99.2%", icon: Terminal },
                        { label: "Match Time", val: "0.4s", icon: Cpu },
                        { label: "Legal Experts", val: "500+", icon: ArrowRight }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <stat.icon className="w-4 h-4 text-gray-600 mb-3" />
                            <span className="text-2xl font-mono text-white mb-1">{stat.val}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;