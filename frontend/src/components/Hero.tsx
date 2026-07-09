import { useNavigate } from "react-router-dom";
import { Search, Shield, Scale, Users, ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("lawyers");

    const practiceAreas = [
        "Corporate Law",
        "Criminal Defense",
        "Family & Divorce",
        "Real Estate",
        "Intellectual Property",
        "Tax & Compliance",
    ];

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/lawyers`, { state: { aiQuery: query } });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#09090b]">
            {/* Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

            {/* Ambient glow — warm navy, not neon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#1e3a5f]/15 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1e3a5f]/[0.07] blur-[100px] rounded-full" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    
                    {/* Left Content */}
                    <div className="max-w-xl">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[13px] font-medium text-zinc-400 tracking-wide">
                                Trusted by 50,000+ clients across India
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                            Find the Right Lawyer.{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#3b82f6]">
                                Right Now.
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg text-zinc-500 leading-relaxed mb-10">
                            Connect with verified, experienced attorneys for any legal matter. 
                            Compare profiles, read client reviews, and book consultations — all in one place.
                        </p>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
                            {[
                                "10,000+ Verified Lawyers",
                                "Bar Council Certified",
                                "Free Initial Consultation",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
                                    <span className="text-sm text-zinc-400">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Search Box */}
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                            {/* Tabs */}
                            <div className="flex gap-1 mb-2 px-2 pt-1">
                                {[
                                    { key: "lawyers", label: "Find Lawyers" },
                                    { key: "services", label: "Legal Services" },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeTab === tab.key
                                                ? "bg-white text-zinc-900"
                                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Input Row */}
                            <div className="flex items-center bg-white/[0.04] rounded-xl p-1.5">
                                <Search className="w-5 h-5 text-zinc-600 ml-3 mr-3 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="e.g. Property dispute in Mumbai, Divorce filing..."
                                    className="flex-1 py-3 text-white placeholder:text-zinc-600 bg-transparent outline-none text-[15px]"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="flex-shrink-0 bg-white text-zinc-900 px-6 py-3 rounded-lg font-semibold text-[15px] flex items-center gap-2 hover:bg-zinc-200 transition-colors"
                                >
                                    Search
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Popular searches */}
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-zinc-600 font-medium">Popular:</span>
                            {practiceAreas.slice(0, 4).map((area) => (
                                <button
                                    key={area}
                                    onClick={() => {
                                        setQuery(area);
                                        navigate(`/lawyers`, { state: { aiQuery: area } });
                                    }}
                                    className="text-xs text-zinc-500 hover:text-zinc-300 border border-white/[0.06] hover:border-white/[0.12] px-3 py-1.5 rounded-full transition-colors bg-white/[0.02]"
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side — Visual Card */}
                    <div className="hidden lg:block relative">
                        {/* Main Card */}
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 max-w-md ml-auto shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                            {/* Card Header */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e3a5f] flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
                                    RS
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white text-[15px] truncate">
                                        Adv. Rajesh Sharma
                                    </h3>
                                    <p className="text-sm text-zinc-500">Supreme Court of India</p>
                                </div>
                                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-semibold text-amber-300">4.9</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {["Criminal Law", "Bail", "Supreme Court"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium text-blue-300/80 bg-blue-500/[0.08] border border-blue-500/[0.1] px-3 py-1.5 rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-3 mb-5">
                                {[
                                    { val: "22 yrs", label: "Experience" },
                                    { val: "1.2K+", label: "Cases Won" },
                                    { val: "₹15K", label: "Consultation" },
                                ].map((s, i) => (
                                    <div key={i} className="text-center bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 px-2">
                                        <div className="text-sm font-bold text-white">{s.val}</div>
                                        <div className="text-[11px] text-zinc-600 mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* AI Match Indicator */}
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/[0.06] to-transparent border border-blue-500/[0.08] mb-5">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span className="text-[13px] text-zinc-400">
                                    <span className="text-blue-300 font-medium">96% match</span> based on your case profile
                                </span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => navigate("/lawyers")}
                                className="w-full bg-white text-zinc-900 py-3.5 rounded-xl font-semibold text-[15px] transition-colors hover:bg-zinc-200 flex items-center justify-center gap-2"
                            >
                                View Full Profile
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Floating card — Verified */}
                        <div className="absolute -bottom-5 -left-6 rounded-xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-md px-5 py-4 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white">Verified Profile</div>
                                <div className="text-xs text-zinc-500">Bar Council & ID verified</div>
                            </div>
                        </div>

                        {/* Floating card — Activity */}
                        <div className="absolute -top-4 right-8 rounded-xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-md px-5 py-3 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <div className="flex -space-x-2">
                                {["AK", "PM", "RS"].map((initials, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-white/[0.06] border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-400"
                                    >
                                        {initials}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-white">2,400+ searches today</div>
                                <div className="text-[11px] text-zinc-500">Active right now</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-24 lg:mt-32 border-t border-white/[0.06] pt-10 pb-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Users, val: "10,000+", label: "Verified Lawyers", desc: "Across 500+ cities" },
                        { icon: Scale, val: "50,000+", label: "Cases Resolved", desc: "94% success rate" },
                        { icon: Shield, val: "100%", label: "Bar Verified", desc: "Licensed & accredited" },
                        { icon: Star, val: "4.8/5", label: "Client Rating", desc: "25,000+ reviews" },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-zinc-500" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">{stat.val}</div>
                                <div className="text-sm font-medium text-zinc-400">{stat.label}</div>
                                <div className="text-xs text-zinc-600 mt-0.5">{stat.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;